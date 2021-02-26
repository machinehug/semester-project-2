import { clearStorageKey } from "./handleStorage.js";
import { tokenKey, userKey } from "./variables.js";

export default function logoutUser() {

    clearStorageKey(tokenKey);
    clearStorageKey(userKey);
    location.href = "/index.html";
};