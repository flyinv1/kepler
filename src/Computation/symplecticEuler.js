import {gravAcc, gravAttr} from "./gravity";
import {addVec, mscalar} from "./vector";

/**
 *
 * @param {Array} bodies - Array of body objects with initial conditions
 * @param {Number} stepSize - Interval on which computations are performed
 * @param {Number} steps - The number of steps to compute
 * @param {Function} callback - a callback function
 */

export default function integrateSystem(bodies, stepSize, steps, callback, stepFunction) {
    var history = [bodies];
    for (let time = 0; time<steps*stepSize; time+=stepSize) {
        //Iterate over all bodies in the system
        bodies = bodies.map((body, i) => {
            // Calculate acceleration vector due to gravitational forces from all other bodies in system, multiply acceleration by timestep for dv vector, add dv to current velocity
            let velocity = addVec(mscalar(bodies.reduce((accumulator, otherBody, j) => {
                if (j === i) return accumulator; //Exclude the current body
                let acceleration = gravAcc(body, otherBody); // Calculate acceleration due to gravity from other body
                accumulator = addVec(accumulator, acceleration);
                return accumulator;
            }, []), stepSize), body.velocity);
            return Object.assign({}, body, { velocity });
        }).map((body) => {
            let position = addVec(mscalar(body.velocity, stepSize), body.position);
            return Object.assign({}, body, { position });
        });
        history.push(bodies);
        // uncomment to allow step by step logging
        // if (stepFunction) stepFunction(bodies);
    }
    callback();
    return history;
}