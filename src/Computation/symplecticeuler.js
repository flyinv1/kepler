import {gravAcc, gravAttr} from "./gravity";
import {addVec, mscalar} from "./vector";

/**
 *
 * @param {Array} bodies -> Array of body objects with initial conditions
 * @param {Number} step - Interval on which computations are performed
 * @param {Number} time - The number of steps to compute
 */

export default function integrateSystem(bodies, step, time) {
    for (let i = 0; i<time; i+=step) {
        bodies = bodies.map((body, i) => {
            let velocity = addVec(mscalar(bodies.reduce((accumulator, otherBody, j) => {
                if (j === i) return accumulator;
                let acceleration = gravAcc(body, otherBody);
                accumulator = addVec(accumulator, acceleration);
                return accumulator;
            }, []), step), body.velocity);
            return Object.assign({}, body, { velocity });
        }).map((body) => {
            let position = addVec(mscalar(body.velocity, step), body.position);
            return Object.assign({}, body, { position });
        });
    }
}