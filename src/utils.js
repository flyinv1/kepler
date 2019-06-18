export function nav(to) {
    return `/#/${to || ""}`;
}

export function style(...args) {
    return args.join(' ');
}

/**
 * @return {number}
 */
export function AUtokm(au) {
    return 1.49597871*au;
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

export function makeRequest(url, method) {
    var request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            if (request.readyState !== 4) return;
            if (request.status >= 200 && request.status < 300) {
                resolve(request);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText,
                })
            }
        };
        request.open(method || 'GET', url, true);
        request.send();
    })
}