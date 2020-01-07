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

export function removeToken() {
    return removeLocalStorage(TOKEN_KEY);
}

export function getPublishedDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currMonth = new Date().getMonth();
    const currDate = new Date().getDate();
    const currYear = new Date().getFullYear();
    return `${months[currMonth]} ${currDate}, ${currYear}`;

    return removeLocalStorage(TOKEN_KEY);
}