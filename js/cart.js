import { getLocalStorage, saveToLocalStorage, handleLocalStorage } from './constants/handleStorage.js';
import { cartKey, tax, shippingCost } from './constants/variables.js';
import createHeader from './components/createHeader.js';
import createFooter from './components/createFooter.js';
import createAdminBanner from './components/createAdminBanner.js';

(function () {
    createHeader();
    createAdminBanner();
    createCart();
    createFooter();
})();

export function createCart() {

    const cart = getLocalStorage(cartKey);

    const container = document.querySelector(".cart-container");
    container.innerHTML = `
            <section class="cart-items-container">
                <h1>Your cart</h1>
                ${createListOfItems(cart)}
            </section>

            <section>

                <table class="total-container">
                    <tr>
                        <td>TOTAL</td>
                        <td class="sum">$${calculatePrice(cart)}</td>
                    </tr>
                </table>

                <hr />

                <table class="cost-container">
                    <tr>
                        <td><span>Delivery</span></td>
                        <td>$${shippingCost}</td>
                    </tr>
                    <tr>
                        <td><span>Tax</span></td>
                        <td class="tax">$${tax(cart)}</td>
                    </tr>
                </table>

                <button class="add-to-cart-btn">CHECKOUT NOW</button>

                <div class="payment-wrapper">
                    <div class="payment">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fab fa-paypal"></i>
                    </div>
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
                </div>

            </section>`;

    const removeFromCartBtns = document.querySelectorAll(".cross");
    removeFromCartBtns.forEach(btn => btn.addEventListener("click", (event) => onAddToCartBtnClick(event, cart)));

    if (cart.length < 1) {

        container.innerHTML = `
            <section class="cart-items-container" style="text-align: center">
                <h1>Your cart</h1>
                There's nothing here... Feel free to browse our <a href="menu.html" style="text-decoration: underline">menu</a>.
            </section>`;
    };

    const quantity = document.querySelectorAll(".quantity");
    quantity.forEach(el => el.addEventListener("change", (event) => cal(event)));

    function cal(event) {

        const productId = parseInt(event.target.dataset.id);
        let quantity = parseInt(event.target.value);

        cart.forEach(el => {

            if (el.id == productId) {
                el.quantity = quantity;

                saveToLocalStorage(cartKey, cart);

                const sumContainer = document.querySelector(".sum");
                sumContainer.innerHTML = "$" + calculatePrice(cart);

                const taxContainer = document.querySelector(".tax");
                taxContainer.innerHTML = "$" + tax(cart);
            };
        });
    };
};

function onAddToCartBtnClick(event, arr) {
    handleLocalStorage(event, arr, cartKey)
    createCart(arr);
    createHeader();
};

function createListOfItems(arr) {

    let html = "";

    arr.forEach(el => {

        if (!el.quantity || el.quantity === 0 || isNaN(el.quantity)) {
            el.quantity = 1
        };

        html += `
                <div class="cart-item">
                    <div class="cart-item-product-info">

                        <a href="product-details.html?id=${el.id}">
                            <div class="cart-img" style="background: url('/strapi/public/${el.image.url}') center no-repeat; background-size: cover;"></div>
                        </a>

                        <div>${el.title}</div>

                        <div class="cart-item-info-link-container">
                            <i class="fas fa-ice-cream"></i> <span class="link">Ingredients</span>
                        </div>

                        <div class="cart-item-input">
                            <span class="cart-item-price">$${el.price}</span>
                            <input class="quantity" max="15" min="1" data-id="${el.id}" type="number" value="${el.quantity}">
                            <i class="fas fa-times cross" data-id="${el.id}"></i>
                        </div>

                    </div>
                </div>`;
    });

    return html;
};

function calculatePrice(arr) {

    let sum = 0;

    arr.forEach(el => {
        sum += (el.price * el.quantity)
    });

    return sum;
};