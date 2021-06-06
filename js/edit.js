import { baseUrl, apiUrl, tokenKey } from "./constants/variables.js";
import { getLocalStorage } from "./constants/handleStorage.js";
import createHeader from './components/createHeader.js';
import { isLoggedIn } from './constants/loggedInStatus.js';
import createFooter from './components/createFooter.js';
import getStrapiSettings from "./constants/getStrapiSettings.js";
import createAdminBanner from './components/createAdminBanner.js';
import displayMessage from './constants/displayMessage.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = baseUrl + apiUrl + id;

if (!isLoggedIn) {
    // if the user is not logged in
    location.href = "/index.html";
} else {
    // if the user is logged in
    createHeader();
    createAdminBanner();
    createEditProductPage();
    createFooter();
};

function createEditProductPage() {

    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    const container = document.querySelector(".edit-product-container");

    container.innerHTML = `
                <section class="edit-product-top-btns-container">
                    <a href="account-edit-products.html"><button><i class="fas fa-arrow-left"></i> Go back</button></a>
                    <a href="product-details.html?id=${id}"><button>Live product page</button></a>
                </section>

                <section>
                    <div id="img"></div>
                    <form>
                        <h1></h1>
                        <div>
                            <label for="name">Name</label>
                            <input id="name" type="text" for="name" placeholder="Product name...">
                            <span class="message">Maximum 10 characters.</span>
                            <span class="message message-error message-error-name"></span>
                        </div>
                        <div>
                            <label for="price">Price (USD)</label>
                            <input id="price" type="number" for="price" placeholder="$...">
                            <span class="message message-error message-error-price"></span>
                        </div>
                        <div>
                            <label for="img">Upload an image</label>
                            <input id="imgfile" type="file">
                            <span class="message">Only choose a picture if you're going to update it.<br /> It must be a JPG, JPEG or PNG image. Maximum 200MB.</span>
                            <span class="message message-error message-error-img"></span>
                        </div>
                        <div>
                            <span class="edit-featured-container"><input id="featured" type="checkbox" name="featured"> Featured (popular product)</span>
                        </div>
                        <div>
                            <label for="description">Description</label>
                            <textarea id="description" name="description" rows="10"
                                placeholder="Product description..."></textarea>
                            <span class="message">Minimum 10 characters.</span>
                            <span class="message message-error message-error-description"></span>
                        </div>
                        <button class="submit disabled" disabled type="submit">SAVE CHANGES</button>
                        <div class="message message-bottom"></div>
                    </form>
                </section>`;

    const formTitle = document.querySelector("form h1");
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const img = document.querySelector("#img");
    const imgFile = document.querySelector("#imgfile");
    const featured = document.querySelector("#featured");
    const submitBtn = document.querySelector(".submit");
    const form = document.querySelector("form");

    (async function () {

        try {
            const response = await fetch(url);
            const json = await response.json();

            name.value = json.title;
            price.value = json.price;
            description.value = json.description;
            featured.checked = json.featured;
            img.style = `background: url('/strapi/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 40rem;`;
            formTitle.innerText = `Edit "${json.title}"`;
        } catch {
            const container = document.querySelector(".edit-product-container");
            container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.")
        };
    })();

    form.addEventListener("submit", (event) => submitForm(name, price, description, featured, imgFile, event));

    form.addEventListener("change", () => {
        submitBtn.disabled = false;
        submitBtn.classList.remove("disabled");
    });

    featured.addEventListener("onclick", () => {
        submitBtn.disabled = false;
        submitBtn.classList.remove("disabled");
    });
};

function submitForm(name, price, description, featured, img, event) {

    event.preventDefault();

    const nameValue = name.value.trim();
    const priceValue = price.value.trim();
    const descriptionValue = description.value.trim();
    const imgValue = img.files[0];
    const featuredStatus = featured.checked;

    const notCorrectImage = img.files.length === 0 || imgValue.size > 200000000 || imgValue.type !== "image/jpeg" && imgValue.type !== "image/jpg" && imgValue.type !== "image/png";

    // image error - Strapi supports a file that is maximum 200MB
    const messageErrorImg = document.querySelector(".message-error-img");
    if (img.files.length > 0 && notCorrectImage) {
        messageErrorImg.innerHTML = displayMessage("message-error", "Must be a JPG, JPEG or PNG image, and it cannot be more than 200MB.");
    } else {
        messageErrorImg.innerHTML = "";
    };

    if (img.files.length > 0 && notCorrectImage) {
        messageErrorImg.innerHTML = displayMessage("message-error", "Must be a JPG, JPEG or PNG image, and it cannot be more than 200MB.");
    } else {
        messageErrorImg.innerHTML = "";
    };

    // name error
    const messageErrorName = document.querySelector(".message-error-name");
    if (nameValue.length < 1 || nameValue.length > 10) {
        messageErrorName.innerHTML = displayMessage("message-error", "Cannot be blank or more than 10 characters.");
    } else {
        messageErrorName.innerHTML = "";
    };

    // price error
    const messageErrorPrice = document.querySelector(".message-error-price");
    if (priceValue <= 0 || isNaN(priceValue)) {
        messageErrorPrice.innerHTML = displayMessage("message-error", "Cannot be 0 or blank, and must be a number.");
    } else {
        messageErrorPrice.innerHTML = "";
    };

    // description error
    const messageErrorDescription = document.querySelector(".message-error-description");
    if (descriptionValue.length < 10) {
        messageErrorDescription.innerHTML = displayMessage("message-error", "Cannot be blank or less than 10 characters.");
    } else {
        messageErrorDescription.innerHTML = "";
    };

    if (
        descriptionValue.length > 9 &&
        nameValue.length < 11 &&
        nameValue.length > 1 &&
        priceValue.length > 0 &&
        !isNaN(priceValue) &&
        priceValue != 0
    ) {
        updateProduct(nameValue, priceValue, descriptionValue, featuredStatus, img, notCorrectImage);
    };
};

async function updateProduct(nameValue, priceValue, descriptionValue, featuredStatus, img, notCorrectImage) {

    const token = getLocalStorage(tokenKey);
    const bottomMessageContainer = document.querySelector(".message-bottom");

    const method = "PUT";
    let data = JSON.stringify({ title: nameValue, price: priceValue, description: descriptionValue, featured: featuredStatus });
    let headersData = { "Content-Type": "application/json", "Authorization": "Bearer " + token };

    if (img.files.length > 0) {

        if (!notCorrectImage) {
            const formData = new FormData();
            formData.append("files.image", img.files[0], img.files[0].name);
            formData.append("data", data);
            data = formData;
            headersData = { "Authorization": "Bearer " + token };
        } else {
            const messageErrorImg = document.querySelector(".message-error-img");
            messageErrorImg.innerHTML = displayMessage("message-error", "Must be a JPG, JPEG or PNG image, and it cannot be more than 200MB.");
            return;
        };
    };

    const strapiSettings = getStrapiSettings(data, method, headersData);

    try {
        const response = await fetch(url, strapiSettings);
        const json = await response.json();
        console.log("response", response);
        console.log("json", json);

        if (json.updated_at) {

            const form = document.querySelector("form");
            const formElements = form.elements
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            };

            const formSubmitBtn = document.querySelector("form button");
            formSubmitBtn.style.cursor = "auto";

            const img = document.querySelector("#img");
            img.style = `background: url('/strapi/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 40rem;`;

            bottomMessageContainer.innerHTML = displayMessage("message-success", `The product was updated successfully. <br /> <br /> To view the live product page, go <a href="product-details.html?id=${json.id}" class="link">here</a>. <br /> <br /> To edit the product again <a href="account-edit-product.html?id=${json.id}" class="link">refresh</a> the page.`);
        };

        if (json.error) {
            bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
        };
    } catch {
        bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
    };
};