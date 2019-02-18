/**
 *
 * @param vector - any size array of values
 * @returns {number} - magnitude of the input vector
 */

export function magnitude(vector) {
    return Math.sqrt(vector.reduce((acc, n) => acc + Math.pow(n, 2), 0));
}

/**
 *
 * @param vector - any size array of numbers
 * @returns {number} - square of the magnitude
 */

export function nonReducedMagnitude(vector) {
    return vector.reduce((acc, n) => acc + Math.pow(n, 2), 0);
}

/**
 *
 * @param vec1
 * @param vec2
 * @returns {Array} - sum of two vectors added element-wise
 */

export function addVec(vec1, vec2) {
    return [vec1, vec2].reduce((acc, vec) => vec.map((val, i) => (acc[i] || 0) + val), []);
}

/**
 *
 * @param vec1
 * @param vec2
 * @returns {number} - inner product of the two vectors
 */

export function dot(vec1, vec2) {
    return vec1.map((val, i) => val * vec2[i]).reduce((acc, val) => acc + val, 0);
}

/**
 *
 * @param vec1 - Array in 3D
 * @param vec2 - Array in 3D
 * @returns {Array} - cross product of two vectors
 */

export function cross(vec1, vec2) {
    if (vec1.length !== 3 || vec2.length !== 3) return undefined;
    return [
        vec1[1]*vec2[2] - vec1[2]*vec2[1],
        vec1[2]*vec2[0] - vec1[0]*vec2[2],
        vec1[0]*vec2[1] - vec1[1]*vec2[0],
    ]
}

/**
 *
 * @param vector
 * @returns {Array} - unit vector in direction of input
 */

export function normalize(vector) {
    let mag = magnitude(vector);
    return vector.map((c) => (c / mag));
}

/**
 *
 * @param vector - input vector
 * @param scalar - scalar value
 * @returns {Array}
 */

export function mscalar(vector, scalar) {
    return vector.map((v) => v*scalar);
}
