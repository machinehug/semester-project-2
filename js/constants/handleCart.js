import { getLocalStorage, saveToLocalStorage } from './handleStorage.js';
import { cartKey } from './variables.js';

export default function handleCart(event, arr) {

    const cart = getLocalStorage(cartKey);

    const btn = event.target;
    const compareId = parseInt(btn.dataset.id);

    const index = arr.findIndex(el => el.id === compareId);

    const isInCart = cart.find(item => item.id === compareId);

    if (isInCart === undefined || isInCart === null || isInCart === false) {
        cart.push(arr[index]);
        arr[index].quantity = 1;
        saveToLocalStorage(cartKey, cart);
    } else {
        const addItemsToCart = cart.filter(item => item.id !== compareId);
        saveToLocalStorage(cartKey, addItemsToCart);
    };
};