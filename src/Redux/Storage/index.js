export function cache(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function getCached(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getSaved(key) {
    return JSON.parse(localStorage.getItem(key));
}


