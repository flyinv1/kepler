import {gravAcc, gravAttr} from "./gravity";
import {addVec, mscalar} from "./vector";

/**
 *
 * @param {Array} bodies - Array of body objects with initial conditions
 * @param {Number} step - Interval on which computations are performed
 * @param {Number} time - The number of steps to compute
 */

export default function integrateSystem(bodies, step, time) {
    var history = [bodies];
    for (let i = 0; i<time; i+=step) {
        //Iterate over all bodies in the system
        bodies = bodies.map((body, i) => {
            // Calculate acceleration vector due to gravitational forces from all other bodies in system, multiply acceleration by timestep for dv vector, add dv to current velocity
            let velocity = addVec(mscalar(bodies.reduce((accumulator, otherBody, j) => {
                if (j === i) return accumulator; //Exclude the current body
                let acceleration = gravAcc(body, otherBody); // Calculate acceleration due to gravity from other body
                accumulator = addVec(accumulator, acceleration);
                return accumulator;
            }, []), step), body.velocity);
            return Object.assign({}, body, { velocity });
        }).map((body) => {
            let position = addVec(mscalar(body.velocity, step), body.position);
            return Object.assign({}, body, { position });
        });
        history.push(bodies);
    }
    return history;
}