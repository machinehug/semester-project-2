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
                    <a href="account-edit-products.html"><button><i class="fas fa-arrow-left"></i> Go
                            back</button></a>
                    <a href="product-details.html?id=${id}"><button>Live product page</button></a>
                </section>
                <section>
                    <div id="img"></div>
                    <form>
                        <h1></h1>
                        <div>
                            <label for="name">Name</label>
                            <input id="name" type="text" for="name" placeholder="Product name...">
                            <span class="message message-error message-error-name"></span>
                        </div>
                        <div>
                            <label for="price">Price (USD)</label>
                            <input id="price" type="number" for="price" placeholder="$...">
                            <span class="message message-error message-error-price"></span>
                        </div>
                        <div>
                            <label for="img-file">Choose a picture</label>
                            <input id="img-file" type="file" name="files">
                            <span class="message">
                                No need to choose a file if you don't want to change the picture. <br />
                                <span class="message-error message-error-img"></span>
                            </span>
                            
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
                        <button class="submit disabled" disabled type="submit">SAVE CHANGES</button>
                        <div class="message message-bottom"></div>
                    </form>
                </section>
                `;

    const formTitle = document.querySelector("form h1");
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const img = document.querySelector("#img");
    const imgFile = document.querySelector("#img-file");
    const featured = document.querySelector("#featured");

    (async function () {

        try {
            const response = await fetch(url);
            const json = await response.json();

            name.value = json.title;
            price.value = json.price;
            description.value = json.description;
            featured.checked = json.featured;

            img.style = `background: url('${json.image_url}') center no-repeat; background-size: cover; width: 100%; height: 40rem;`;
            formTitle.innerText = `Edit " ${json.title} "`;
        } catch {
            const container = document.querySelector(".edit-product-container");
            container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.")
        };
    })();

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => submitForm(name, price, description, featured, imgFile, event));
    form.addEventListener("keyup", () => {

        const submitBtn = document.querySelector(".submit");
        submitBtn.disabled = false;
        submitBtn.classList.remove("disabled");
    });
};

function submitForm(name, price, description, featured, img, event) {

    event.preventDefault();

    const nameValue = name.value.trim();
    const priceValue = price.value.trim();
    const descriptionValue = description.value.trim();
    let imgValue = undefined;
    const featuredStatus = featured.checked;

    if (img.files.length > 0) {
        imgValue = img.files[0].name;
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
        messageErrorDescription.innerHTML = displayMessage("message-error", "Cannot be blank or less than 10 characters.");
    } else {
        messageErrorDescription.innerHTML = "";
    };

    if (descriptionValue.length > 9 && nameValue.length < 21 && nameValue.length > 1 && priceValue.length > 0 && priceValue != 0) {
        updateProduct(nameValue, priceValue, descriptionValue, featuredStatus, imgValue);
    };
};

async function updateProduct(nameValue, priceValue, descriptionValue, featuredStatus, imgValue) {

    const token = getLocalStorage(tokenKey);

    let bodyData = JSON.stringify({ title: nameValue, price: priceValue, description: descriptionValue, featured: featuredStatus });

    if (imgValue != undefined) {
        bodyData = JSON.stringify({ title: nameValue, price: priceValue, description: descriptionValue, image_url: `/strapi/public/uploads/${imgValue}`, featured: featuredStatus });
    };

    const method = "PUT";
    const headersData = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
    const strapiSettings = getStrapiSettings(bodyData, method, headersData);

    const bottomMessageContainer = document.querySelector(".message-bottom");

    try {
        const response = await fetch(url, strapiSettings);
        const json = await response.json();

        if (json.updated_at) {

            const form = document.querySelector("form");
            const formElements = form.elements
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            };

            const formSubmitBtn = document.querySelector("form button");
            formSubmitBtn.style.cursor = "auto";

            const img = document.querySelector("#img");
            img.style = `background: url('${json.image_url}') center no-repeat; background-size: cover; width: 100%; height: 40rem;`;

            bottomMessageContainer.innerHTML = displayMessage("message-success", `The product was updated successfully. <br /> <br /> To view the live product page, go <a href="product-details.html?id=${json.id}" class="link">here</a>. <br /> <br /> To edit the product again <a href="account-edit-product.html?id=${json.id}" class="link">refresh</a> the page.`);
        };

        if (json.error) {
            bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
        };
    } catch {
        bottomMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
    };
};