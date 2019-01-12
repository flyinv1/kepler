export function magnitude(vector) {
    return Math.sqrt(vector.reduce((acc, n) => acc + Math.pow(n, 2), 0));
}

export function nonReducedMagnitude(vector) {
    return vector.reduce((acc, n) => acc + Math.pow(n, 2), 0);
}

export function addVec(vec1, vec2) {
    return [vec1, vec2].reduce((acc, vec) => vec.map((val, i) => (acc[i] || 0) + val), []);
}

export function dot(vec1, vec2) {
    return vec1.map((val, i) => val * vec2[i]).reduce((acc, val) => acc + val, 0);
}

export function cross(vec1, vec2) {
    if (vec1.length !== 3 || vec2.length !== 3) return undefined;
    return [
        vec1[1]*vec2[2] - vec1[2]*vec2[1],
        vec1[2]*vec2[0] - vec1[0]*vec2[2],
        vec1[0]*vec2[1] - vec1[1]*vec2[0],
    ]
}

export function normalize(vector) {
    let mag = magnitude(vector);
    return vector.map((c) => (c / mag));
}

export function mscalar(vector, scalar) {
    return vector.map((v) => v*scalar);
}
