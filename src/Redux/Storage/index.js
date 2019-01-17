export function cache(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function getCached(key) {
    return JSON.parse(sessionStorage.getItem(key));
}


