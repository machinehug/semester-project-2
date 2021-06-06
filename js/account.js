import createHeader from './components/createHeader.js';
import createAdminBanner from './components/createAdminBanner.js';
import createFooter from './components/createFooter.js';
import { isLoggedIn } from './constants/loggedInStatus.js';

if (isLoggedIn) {
    createHeader();
    createAdminBanner();
    createAdminHomePage();
    createFooter();
} else {
    window.location = "index.html";
};

function createAdminHomePage() {

    const container = document.querySelector(".account-and-login-container");
    container.innerHTML = `
            <section class="account-options-container">
                <a href="account-edit-products.html"><button><i class="far fa-edit"></i> Edit product</button></a>
                <a href="account-add-new-product.html"><button><i class="fas fa-plus"></i> Add new product</button></a>
                <a href="account-edit-products.html"><button class="danger-btn"><i class="far fa-trash-alt"></i> Delete
                        product</button></a>
            </section>`;
};