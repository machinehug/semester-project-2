import { baseUrl, apiUrl } from "./constants/variables.js";
import createHeader from './components/createHeader.js';
import createFooter from './components/createFooter.js';
import createMenuInput from './components/createMenuInput.js';
import handleSearch from './constants/handleSearch.js';
import createFeaturedProducts from './components/createFeaturedProducts.js';
import createAdminBanner from './components/createAdminBanner.js';
import createMenu from "./components/createMenu.js";
import displayMessage from './constants/displayMessage.js';

(async function () {

    const url = baseUrl + apiUrl;

    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("response", response);

        createHeader();
        createAdminBanner();
        createMenuInput(json.length);
        createMenu(json);
        createFeaturedProducts(json);
        createFooter();
        handleSearch(json, createMenu);
    } catch (error) {
        console.log(error);
        const container = document.querySelector(".menu-wrapper .cards");
        container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
        createHeader();
        createFooter();
    };
})();