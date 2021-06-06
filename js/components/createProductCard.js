export default function createProductCard(el, productIsInCart, productIsInFaves) {

    let addToCartBtnTxt = "add to cart";
    let addToCartBtnCss = "";
    let addToFavesBtnCss = "far";

    if (productIsInCart) {
        addToCartBtnTxt = "added";
        addToCartBtnCss = "added-to-cart";
    };

    if (productIsInFaves) {
        addToFavesBtnCss = "fas";
    };

    return `
                    <div class="card-product">
                        <a href="product-details.html?id=${el.id}">
                            <div class="card-product-img" style="background: url('/strapi/public/${el.image.url}') center no-repeat; background-size: cover;"></div>
                        </a>
                        <div class="card-product-info">
                            <div class="card-product-info-txt">
                                <span>${el.title}</span>
                                <span>$${el.price}</span>
                                <i class='${addToFavesBtnCss} fa-heart heart fave-btn' data-id="${el.id}"></i>
                            </div>
                            <button class="add-to-cart-btn ${addToCartBtnCss}" data-id="${el.id}">${addToCartBtnTxt}</button>
                        </div>
                    </div>`;
};