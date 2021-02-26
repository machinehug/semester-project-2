import { getLocalStorage } from './handleStorage.js';
import { tokenKey, userKey } from './variables.js';

const username = getLocalStorage(userKey);
const token = getLocalStorage(tokenKey);

export const isLoggedIn = token.length > 1 && username.length > 1;