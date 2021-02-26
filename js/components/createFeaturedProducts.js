import { cartKey } from "../constants/variables.js";
import { getLocalStorage } from '../constants/handleStorage.js';
import addProductToCart from "../constants/addProductToCart.js";
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
        const productIsInCart = cart.find(product => product.id == parseInt(el.id));

        if (el.featured) {
            innerContainer.innerHTML += createProductCard(el, productIsInCart);
        };
    });

    addProductToCart(arr);
};