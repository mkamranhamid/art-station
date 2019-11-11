import { TOKEN_KEY } from './constants';

export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}

export function setToken(token) {
    return setLocalStorage(TOKEN_KEY, token);
}

export function getToken() {
    return getLocalStorage(TOKEN_KEY);
}