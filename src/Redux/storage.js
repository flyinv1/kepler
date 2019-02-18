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
    let saved = localStorage.getItem(key);
    if (saved) { return JSON.parse(saved) } else return false;
}

export function removeSaved(key) {
    return localStorage.removeItem(key);
}


