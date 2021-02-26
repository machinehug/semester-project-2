import handleCart from "./handleCart.js";
import createHeader from '../components/createHeader.js';
import { baseUrl, apiUrl } from "./variables.js";
import createMenu from "../components/createMenu.js";
import createFeaturedProducts from '../components/createFeaturedProducts.js';
import displayMessage from './displayMessage.js';

export default function addProductToCart(arr) {

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

    addToCartBtns.forEach(btn => btn.addEventListener("click", (event) => {

        handleCart(event, arr);
        createHeader();

        const btn = event.target;

        btn.classList.toggle("added-to-cart");

        if (btn.innerHTML === "added") {
            btn.innerHTML = "add to cart";
        } else {
            btn.innerHTML = "added";
        };

        if (window.location.href === "http://127.0.0.1:5500/menu.html") {

            (async function () {

                const url = baseUrl + apiUrl;

                try {
                    const response = await fetch(url);
                    const json = await response.json();

                    createMenu(json);
                    createFeaturedProducts(json);
                } catch {
                    const container = document.querySelector(".container");
                    container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
                };
            })();
        };
    }));
};