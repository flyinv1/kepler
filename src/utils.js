export function nav(to) {
    return `/#/${to || ""}`;
}

/**
 * @return {number}
 */
export function AUtokm(au) {
    return 1.49597871*au;
}

// TODO:: Use vector normalization function from computation
export function checkNormalization(arr) {
    return Math.sqrt(arr.reduce((acc, n) => acc + Math.pow(parseFloat(n), 2), 0)) || 0;
}

export function randomTag() {
    return Math.random().toString(36).substr(2, 5);
}

export function spacedVectorString(arr) {
    if (arr.constructor === Array) {
        return arr.join(' ');
    }
    return arr;
}

export function currentDateString() {
    let date = new Date();
    return `${twoDig(date.getHours())}:${twoDig(date.getMinutes())}:${twoDig(date.getSeconds())}`;
}

// Assuming str.length >= 1
export function twoDig(str) {
    return ((str.toString().length < 2) ? "0" : "") + str.toString();
}