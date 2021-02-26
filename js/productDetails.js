import { baseUrl, apiUrl, cartKey } from './constants/variables.js';
import createHeader from './components/createHeader.js';
import createFooter from './components/createFooter.js';
import createAdminBanner from './components/createAdminBanner.js';
import { getLocalStorage } from './constants/handleStorage.js';
import addProductToCart from "./constants/addProductToCart.js";
import displayMessage from './constants/displayMessage.js';

(async function () {

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    const url = baseUrl + apiUrl + id;

    try {
        const response = await fetch(url);
        const json = await response.json();

        createHeader();
        createAdminBanner();
        createProductDetails(json);
        createFooter();
    } catch {
        const container = document.querySelector(".container");
        container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
        createHeader();
    };
})();

function createProductDetails(el) {

    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    document.title = "nicecream. " + el.title;

    const cart = getLocalStorage(cartKey);
    const productIsInCart = cart.find(product => product.id == parseInt(el.id));

    let addToCartBtnTxt = "add to cart";
    let addToCartBtnCss = "";

    if (productIsInCart) {
        addToCartBtnTxt = "added";
        addToCartBtnCss = "added-to-cart";
    };

    const container = document.querySelector(".product-details-container");

    container.innerHTML = `
            <nav>
                <ol>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="menu.html">Menu</a></li>
                    <li><a href="#">${el.title}</a></li>
                </ol>
            </nav>

            <section class="product-details-img" style="background: url('${el.image_url}') center no-repeat; background-size: cover;>
                <i class="fas fa-heart heart"></i>
            </section>

            <section>
                <h1>${el.title}</h1>
                <div>
                    <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        142 reviews
                    </div>
                </div>
                <div class="price">&#36; ${el.price}</div>
                <p class="description">
                    " ${el.description} "
                </p>
                <div>
                    <button class="add-to-cart-btn ${addToCartBtnCss}" data-id="${el.id}">${addToCartBtnTxt}</button>
                </div>
                <div class="warranty-container">
                    <i class="fas fa-thumbs-up"></i>
                    <div>
                        <p>
                            Psst. We offer flavor warranty. <br />
                            Don’t like the ice cream? Get a refund.
                        </p>
                    </div>
                </div>
                <div class="faq">
                    <div>
                        <i class="fas fa-map-marker-alt"></i>
                        Buy the ice cream in one of our <span>shops</span>?
                    </div>
                    <div>
                        <i class="fas fa-question-circle"></i>
                        Any <span>questions</span> about payments etc.?
                    </div>
                    <div>
                        <i class="fas fa-ice-cream"></i>
                        <span>Ingredients</span> info.
                    </div>
                </div>
            </section>`;

    (async function () {

        const url = baseUrl + apiUrl;

        try {
            const response = await fetch(url);
            const json = await response.json();

            addProductToCart(json);
        } catch {
            const loader = document.querySelector(".loader");
            loader.style.display = "none";
            const container = document.querySelector(".container");
            container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
            createHeader();
        };
    })();
};