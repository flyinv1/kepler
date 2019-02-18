import {
    magnitude,
    addVec,
    normalize,
    nonReducedMagnitude
} from "./vector";
import { G } from './constants';

/**
 *
 * @param a - first body
 * @param b - second body
 * @param a.position - first body position vector [3 components]
 * @param b.position - second body position vector [3 components]
 * @param a.mass
 * @param b.mass
 * @returns force - the force exerted by body b on body a
 */

//unnecessary ops in this function using imported vector math
export function gravAttr(a, b) {
    let r3 = addVec(b.position, a.position.map((r) => -1*r));
    let mag = (G * a.mass * b.mass) / (Math.pow(magnitude(r3), 2));
    let dir = normalize(r3);
    return dir.map((u) => mag*u);
}

/**
 * @param ra - position vector of first body
 * @param rb - position vector of second body
 * @param mb - mass of second body
 * @returns acceleration - acceleration of body a
 */

export function gravAcc(ra, rb, mb) {
    let r3 = addVec(rb, ra.map((r) => -1*r));
    let mag = (G * mb) / nonReducedMagnitude(r3);
    let dir = normalize(r3);
    return dir.map((u) => mag*u);
}