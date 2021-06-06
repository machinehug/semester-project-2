import { cartKey, faveKey } from "../constants/variables.js";
import { getLocalStorage, handleLocalStorage } from '../constants/handleStorage.js';
import createProductCard from "./createProductCard.js";

export default function createFeaturedProducts(arr) {

    const outerContainer = document.querySelector(".featured-products-container");
    outerContainer.innerHTML = `
                <h1>What people are craving &#8250;</h1>
                <div class="cards">
                    <div class="featured-products-cards"></div>
                </div>`;

    arr.forEach(el => {

        const innerContainer = document.querySelector(".featured-products-cards");

        const cart = getLocalStorage(cartKey);
        const faves = getLocalStorage(faveKey);

        const productIsInFaves = faves.find(product => product.id === parseInt(el.id));
        const productIsInCart = cart.find(product => product.id == parseInt(el.id));

        if (el.featured) {
            innerContainer.innerHTML += createProductCard(el, productIsInCart, productIsInFaves);
        };
    });

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    addToCartBtns.forEach(btn => btn.addEventListener("click", (event) => {

        handleLocalStorage(event, arr, cartKey);

        const cartLength = document.querySelector(".cart-sum");
        cartLength.textContent = getLocalStorage(cartKey).length;

        addToCartBtns.forEach(el => {

            if (el.dataset.id === btn.dataset.id) {

                el.classList.toggle("added-to-cart");

                if (el.classList.contains("added-to-cart")) {
                    el.textContent = "added";
                } else {
                    el.textContent = "add to cart";
                };
            };
        });
    }));

    const addToFavesBtns = document.querySelectorAll(".fave-btn");
    addToFavesBtns.forEach(btn => btn.addEventListener("click", (event) => {

        handleLocalStorage(event, arr, faveKey);

        const btn = event.target;

        addToFavesBtns.forEach(el => {

            if (el.dataset.id === btn.dataset.id) {
                el.classList.toggle("far");
                el.classList.toggle("fas");
            };
        });
    }));
};