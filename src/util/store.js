export function setItems(storageKey, items) {
    localStorage.setItem(storageKey, items);
}

export function getItems(storageKey) {
    return localStorage.getItem(storageKey);
}