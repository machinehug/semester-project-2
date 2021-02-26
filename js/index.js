import { baseUrl, apiUrl, homeHeroUrl } from './constants/variables.js';
import createHeader from './components/createHeader.js';
import createFooter from './components/createFooter.js';
import createFeaturedProducts from './components/createFeaturedProducts.js';
import createAdminBanner from './components/createAdminBanner.js';
import displayMessage from './constants/displayMessage.js';

(async function () {

    const featuredProductsUrl = baseUrl + apiUrl;
    const heroImgUrl = baseUrl + homeHeroUrl;

    try {
        const featuredProductsFetch = await fetch(featuredProductsUrl);
        const featuredProductsJson = await featuredProductsFetch.json();

        const heroImgFetch = await fetch(heroImgUrl);
        const heroImgJson = await heroImgFetch.json();

        createHeader();
        createAdminBanner();
        addHeroPicture(heroImgJson);
        createFeaturedProducts(featuredProductsJson);
        createFooter();
    } catch {
        const container = document.querySelector(".container");
        container.innerHTML = displayMessage("message-error message-error-center", "An error occurred. Please try again later.");
        createHeader();
    };
})();

function addHeroPicture(json) {

    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    const container = document.querySelector(".index-container");

    container.innerHTML = `
            <div class="hero" style="background: url('../strapi/public${json.hero_banner.url}') center no-repeat">
                <a href="menu.html">
                    <h1>Custom, handmade, ice cream&#8250;</h1>
                </a>
            </div>

            <section class="cards cards-index">
                <div class="card-upper card1-upper">
                    <a href="menu.html">
                        <h1>Gifts for all&#8250;</h1>
                    </a>
                </div>
                <div class="card-upper card2-upper">
                    <a href="menu.html">
                        <h1>Inspo&#8250;</h1>
                    </a>
                </div>
                <div class="card-upper card3-upper">
                    <a href="menu.html">
                        <h1>#stayathome</h1>
                        <h2>We deliver ice cream to you. &hearts;</h2>
                    </a>
                </div>
            </section>

            <section class="products-wrapper featured-products-container"></section>

            <section class="reviews-container">
                <h1>
                    We'd love to hear from you.
                </h1>
                <div class="reviews-stars-container">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div>Based on 1046 reviews.</div>
            </section>`;
};