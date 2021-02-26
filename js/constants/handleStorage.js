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