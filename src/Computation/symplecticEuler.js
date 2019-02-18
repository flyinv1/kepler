import {gravAcc, gravAttr} from "./gravity";
import {addVec, magnitude, mscalar, nonReducedMagnitude} from "./vector";

export default (bodies, stepSize, steps, stepFunction, callback) => {
    var maxNonReduced = 0;
    var maxRad = 0;

    var history = [[[]]];
    bodies.map((body, i) => {
        history[0][i] = [...body.position, ...body.velocity];
    });
    //history[step] -> array of bodies at time-step
    //history[step][i] -> array of pos/vel of body at index -> [r1 r2 r3 v1 v2 v3]

    // Proceed through time
    for (let step = 0; step<steps; step+=1) {
        history.push([[]]);

        // At each timestep, calculate change in body parameters
        history[step].map((body, index) => {

            // For each body, calculate the new velocity from acceleration
            // Multiply the acceleration by the timestep and add to current velocity
            history[step + 1][index] = addVec(mscalar(history[step].reduce((accumulator, otherBody, j) => {

                // If the same body, don't do anything
                if (index === j) return accumulator;

                // Otherwise, calculate acc from distance and mass of other body
                let acceleration = gravAcc(body.slice(0, 3), otherBody.slice(0, 3), bodies[j].mass);

                // Add to acc vector
                accumulator = addVec(accumulator, acceleration);

                return accumulator;
            }, []), stepSize), body.slice(3));
        });

        // From new velocities, calculate change in positions
        history[step].map((body, index) => {
            let position = addVec(mscalar(history[step+1][index], stepSize), body.slice(0, 3));
            let nonReduced = nonReducedMagnitude(position.slice(0,2));
            if (nonReduced > maxNonReduced) {
                maxNonReduced = nonReduced;
                maxRad = magnitude(position.slice(0,2));
            }
            history[step + 1][index].unshift(...position)
        });
    }
    callback();
    return {
        history: history,
        maxRadius: maxRad,
    };
}