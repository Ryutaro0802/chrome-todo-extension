/**
 * localStorage に保存
 * @param {String} storageKey storageKey
 * @param {String} items storage Items
 */
export function setItems(storageKey, items) {
    localStorage.setItem(storageKey, items);
}

/**
 * localStorage から取り出す
 * @param {String} storageKey storageKey
 */
export function getItems(storageKey) {
    return localStorage.getItem(storageKey);
}