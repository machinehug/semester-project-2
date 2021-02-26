import { baseUrl, apiUrl, tokenKey } from "./constants/variables.js";
import createHeader from './components/createHeader.js';
import { isLoggedIn } from './constants/loggedInStatus.js';
import createFooter from './components/createFooter.js';
import getStrapiSettings from "./constants/getStrapiSettings.js";
import createAdminBanner from './components/createAdminBanner.js';
import { getLocalStorage } from "./constants/handleStorage.js";
import displayMessage from './constants/displayMessage.js';

if (!isLoggedIn) {
    location.href = "/index.html";
} else {
    createHeader();
    createAdminBanner();
    createAddNewProductPage();
    createFooter();
};

function createAddNewProductPage() {

    const container = document.querySelector(".add-new-product-container");

    container.innerHTML = `
                <section>
                    <a href="account.html"><button class="btn-go-back"><i class="fas fa-arrow-left"></i> Go
                            back</button></a>
                </section>
                <h1>Add new product</h1>
                <form>
                    <div>
                        <label for="name">Name</label>
                        <input id="name" type="text" for="name" placeholder="Product name...">
                        <span class="message">Maximum 20 characters.</span>
                        <span class="message message-error message-error-name"></span>
                    </div>
                    <div>
                        <label for="price">Price (USD)</label>
                        <input id="price" type="number" for="price" placeholder="$...">
                        <span class="message message-error message-error-price"></span>
                    </div>
                    <div>
                        <label for="img">Choose a picture</label>
                        <input id="img" type="file" name="files">
                        <span class="message">First you have to add the picture to /strapi/public/uploads/ then you choose the same file you just added by clicking above.</span>
                        <span class="message message-error message-error-img"></span>
                    </div>
                    <div>
                        <span class="edit-featured-container"><input id="featured" type="checkbox" name="featured"> Featured (popular product)</span>
                    </div>
                    <div>
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="10"
                            placeholder="Product description..."></textarea>
                        <span class="message message-error message-error-description"></span>
                    </div>
                    <button type="submit">ADD NEW PRODUCT</button>
                    <div class="message message-bottom"></div>
                </form>`;

    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const img = document.querySelector("#img");
    const featured = document.querySelector("#featured");

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => submitForm(name, price, description, featured, img, event));
};

function submitForm(name, price, description, featured, img, event) {

    event.preventDefault();

    const nameValue = name.value.trim();
    const priceValue = price.value.trim();
    const descriptionValue = description.value.trim();
    let imgValue = undefined;
    const featuredStatus = featured.checked;

    // img error
    const messageErrorImg = document.querySelector(".message-error-img");
    if (img.files.length < 1) {
        messageErrorImg.innerHTML = displayMessage("message-error", "Please choose a picture.");
    } else {
        imgValue = img.files[0].name;
        messageErrorImg.innerHTML = "";
    };

    // name error
    const messageErrorName = document.querySelector(".message-error-name");
    if (nameValue.length < 1 || nameValue.length > 20) {
        messageErrorName.innerHTML = displayMessage("message-error", "Cannot be blank or more than 20 characters.");
    } else {
        messageErrorName.innerHTML = "";
    };

    // price error
    const messageErrorPrice = document.querySelector(".message-error-price");
    if (priceValue == 0 || priceValue.length < 1) {
        messageErrorPrice.innerHTML = displayMessage("message-error", "Cannot be 0 or blank.");
    } else {
        messageErrorPrice.innerHTML = "";
    };

    // description error
    const messageErrorDescription = document.querySelector(".message-error-description");
    if (descriptionValue.length < 10) {
        messageErrorDescription.innerHTML = displayMessage("message-error", "Cannot be blank and the description cannot be less than 10 characters.");
    } else {
        messageErrorDescription.innerHTML = "";
    };

    // on update
    if (img.files.length > 0 && descriptionValue.length > 9 && nameValue.length < 21 && nameValue.length > 1 && priceValue.length > 0 && priceValue != 0 && imgValue.length > 0) {
        addNewProduct(nameValue, priceValue, descriptionValue, featuredStatus, imgValue);
    };
};

async function addNewProduct(nameValue, priceValue, descriptionValue, featuredStatus, imgValue) {

    const token = getLocalStorage(tokenKey);
    const url = baseUrl + apiUrl;

    const bodyData = JSON.stringify({ title: nameValue, price: priceValue, description: descriptionValue, image_url: `/strapi/public/uploads/${imgValue}`, featured: featuredStatus });
    const method = "POST";
    const headersData = { "Content-Type": "application/json", "Authorization": "Bearer " + token };
    const strapiSettings = getStrapiSettings(bodyData, method, headersData);

    const bottomMessageContainer = document.querySelector(".message-bottom");

    try {
        const response = await fetch(url, strapiSettings);
        const json = await response.json();

        if (json.created_at) {
            const form = document.querySelector("form");
            const formElements = form.elements
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            };

            const formSubmitBtn = document.querySelector("form button");
            formSubmitBtn.style.cursor = "auto";

            bottomMessageContainer.innerHTML = displayMessage("message-success", `The product was added successfully. To view the live product page, go <a href="product-details.html?id=${json.id}" class="link">here</a>. <br /> To add a new product <a href="account-add-new-product.html" class="link">refresh</a> the page.`);
        };

        if (json.error) {
            bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
        };
    } catch (error) {
        bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
    };
};