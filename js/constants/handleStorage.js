export function getLocalStorage(key) {

    const currentStorage = localStorage.getItem(key);

    if (!currentStorage) {
        return [];
    };

    return JSON.parse(currentStorage);
};

export function saveToLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};


export function clearStorageKey(key) {
    localStorage.removeItem(key);
};

export function handleLocalStorage(event, arr, key) {

    const storage = getLocalStorage(key);
    const el = event.target;
    const compareId = parseInt(el.dataset.id);

    const index = arr.findIndex(el => el.id === compareId);
    const isInStorage = storage.find(item => item.id === compareId);

    if (isInStorage === undefined || isInStorage === null || isInStorage === false) {
        storage.push(arr[index]);
        saveToLocalStorage(key, storage);
    } else {
        const itemsToAdd = storage.filter(item => item.id !== compareId);
        saveToLocalStorage(key, itemsToAdd);
    };
};