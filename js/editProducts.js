import { baseUrl, apiUrl, tokenKey } from './constants/variables.js';
import createHeader from './components/createHeader.js';
import createAdminBanner from './components/createAdminBanner.js';
import createFooter from './components/createFooter.js';
import createMenuInput from './components/createMenuInput.js';
import displayMessage from './constants/displayMessage.js';
import { getLocalStorage } from "./constants/handleStorage.js";
import getStrapiSettings from "./constants/getStrapiSettings.js";
import handleSearch from './constants/handleSearch.js';
import { isLoggedIn } from './constants/loggedInStatus.js';

if (isLoggedIn) {

    (async function () {

        const url = baseUrl + apiUrl;

        try {
            const response = await fetch(url);
            const json = await response.json();

            createHeader();
            createAdminBanner();
            createMenuInput(json.length);
            createProductsList(json);
            createFooter();
            handleSearch(json, createProductsList);
        } catch {
            const container = document.querySelector(".container");
            container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
            createHeader();
        };
    })();
} else {
    // if admin is not logged in
    window.location = "index.html";
};

function createProductsList(arr) {

    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    const container = document.querySelector(".cards");

    // "create your own" product
    container.innerHTML = `
                    <div class="card-product">
                        <a href="">
                            <div class="card-product-create-img"></div>
                        </a>
                        <div class="card-product-info">
                            <div class="card-product-create-txt">
                                Create your own!
                                <button>Live product page</button>
                                <button>Edit</button>
                                <button class="danger-btn">DELETE</button>
                            </div >
                        </div >
                    </div > `;

    // all other products
    arr.forEach(el => {

        container.innerHTML += `
                    <div class="card-product">
                        <div class="card-product-img" style="background: url('/strapi/public/${el.image.url}') center no-repeat; background-size: cover;"></div>
                        <div class="card-product-info">
                            <div class="card-product-info-txt">
                                <span>${el.title}</span>
                                <span>$${el.price}</span>
                            </div>
                            <a href="product-details.html?id=${el.id}"><button>Live product page</button></a>
                            <a href="account-edit-product.html?id=${el.id}"><button>Edit</button></a>
                            <button class="danger-btn" id="delete-product-btn" data-id="${el.id}">DELETE</button>
                        </div>
                    </div >`;
    });

    const deleteProductBtn = document.querySelectorAll("#delete-product-btn");
    deleteProductBtn.forEach(btn => btn.addEventListener("click", (event) => deleteProduct(event)));
};

function deleteProduct(event) {

    const deleteSuccessMessage = document.querySelector(".message-delete-success");
    const deleteContainer = document.querySelector(".delete-container");
    const cancelDeleteBtn = document.querySelector(".btn-delete-cancel");
    const btns = document.querySelectorAll("button");
    const body = document.body;
    const deleteBtnConfirm = document.querySelector(".btn-delete-confirm");

    deleteContainer.classList.remove("hidden");

    // make the page unscrollable
    body.style.overflow = "hidden";

    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    };

    cancelDeleteBtn.disabled = false;
    deleteBtnConfirm.disabled = false;

    cancelDeleteBtn.addEventListener("click", () => {
        deleteContainer.classList.add("hidden");
        body.style.overflow = "initial";

        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
        };
    });

    const id = event.target.dataset.id;
    deleteBtnConfirm.addEventListener("click", () => doDelete(id));

    async function doDelete() {

        const token = getLocalStorage(tokenKey);
        const url = baseUrl + apiUrl + id;

        const method = "DELETE";
        const headersData = { "Authorization": `Bearer ${token}` };
        const strapiSettings = getStrapiSettings("", method, headersData);

        try {
            const response = await fetch(url, strapiSettings);
            const json = await response.json();

            if (json.error) {
                deleteSuccessMessage.innerHTML = displayMessage("", "We cannot seem to delete the product now. Please try again later.");
            } else {
                const getCurrentProducts = await fetch(baseUrl + apiUrl);
                const currentProducts = await getCurrentProducts.json();

                deleteBtnConfirm.disabled = true;

                deleteSuccessMessage.innerHTML = displayMessage("", "The product was deleted successfully. You can close this window now.");

                createProductsList(currentProducts);
            };
        } catch {
            deleteSuccessMessage.innerHTML = displayMessage("", "We cannot seem to delete the product now. Please try again later.");
        };
    };
};