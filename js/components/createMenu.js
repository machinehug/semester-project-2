import { getLocalStorage } from '../constants/handleStorage.js';
import { cartKey } from '../constants/variables.js';
import createProductCard from "./createProductCard.js";

export default function createMenu(arr) {

    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    const container = document.querySelector(".products-wrapper .cards");

    container.innerHTML = `
                    <div class="card-product card-product-create-your-own-container">
                        <a href="#">
                            <div class="card-product-create-img"></div>
                        </a>
                        <div class="card-product-info">
                            <div class="card-product-create-txt">
                                Create your own!
                            </div >
                        </div >
                    </div > `;

    arr.forEach(el => {

        const cart = getLocalStorage(cartKey);
        const productIsInCart = cart.find(product => product.id === parseInt(el.id));

        container.innerHTML += createProductCard(el, productIsInCart);
    });
};