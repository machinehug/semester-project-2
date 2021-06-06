import { getLocalStorage, handleLocalStorage, saveToLocalStorage } from './constants/handleStorage.js';
import { cartKey, faveKey } from './constants/variables.js';
import createHeader from './components/createHeader.js';
import createFooter from './components/createFooter.js';
import createAdminBanner from './components/createAdminBanner.js';
import createProductCard from "./components/createProductCard.js";

(function () {
    createHeader();
    createAdminBanner();
    createFaves();
    createFooter();
})();

export function createFaves() {

    const faves = getLocalStorage(faveKey);

    const container = document.querySelector(".faves-container .cards");

    if (faves.length < 1) {

        container.innerHTML = `
            <section class="faves-items-container">
                <h1>Your faves</h1>
                There's nothing here... Feel free to browse our <a href="menu.html" style="text-decoration: underline">menu</a>.
            </section>`;

        return;
    };

    container.innerHTML = `
        <section class="faves-items-container">
            <h1>Your faves</h1>
            <button class="add-all-to-cart">Add everything to cart</button>
            <div class="faves-items-container-inner">
                ${createListOfItems(faves)}
            </div>
        </section>`;

    const cartBtns = document.querySelectorAll(".add-to-cart-btn");
    cartBtns.forEach(btn => btn.addEventListener("click", (event) => {
        handleLocalStorage(event, faves, cartKey);
        createFaves();
        createHeader();
    }));

    const faveBtns = document.querySelectorAll(".heart");
    faveBtns.forEach(btn => btn.addEventListener("click", (event) => {
        handleLocalStorage(event, faves, faveKey);
        createFaves();
    }));

    const addAllToCartBtn = document.querySelector(".add-all-to-cart");
    addAllToCartBtn.addEventListener("click", addAllToCart);
};

function createListOfItems(arr) {

    let html = "";

    arr.forEach(el => {

        const cart = getLocalStorage(cartKey);
        const productIsInCart = cart.find(product => product.id === parseInt(el.id));

        html += createProductCard(el, productIsInCart, true);
    });

    return html;
};

function addAllToCart() {

    const faves = getLocalStorage(faveKey);
    const cart = getLocalStorage(cartKey);

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    addToCartBtns.forEach(event => {

        const compareId = parseInt(event.dataset.id);
        const index = faves.findIndex(el => el.id === compareId);
        const isInStorage = cart.find(item => item.id === compareId);

        if (isInStorage === undefined || isInStorage === null || isInStorage === false) {
            cart.push(faves[index]);
            saveToLocalStorage(cartKey, cart);
        };
    });

    createFaves();
};