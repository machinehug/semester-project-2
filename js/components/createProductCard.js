export default function createProductCard(el, productIsInCart) {

    let addToCartBtnTxt = "add to cart";
    let addToCartBtnCss = "";

    if (productIsInCart) {
        addToCartBtnTxt = "added";
        addToCartBtnCss = "added-to-cart";
    };

    return `
                    <div class="card-product">
                        <a href="product-details.html?id=${el.id}">
                            <div class="card-product-img" style="background: url('${el.image_url}') center no-repeat; background-size: cover;">
                                <i class='fas fa-heart heart'></i>
                            </div>
                        </a>
                        <div class="card-product-info">
                            <div class="card-product-info-txt">
                                <span>${el.title}</span>
                                <span>$${el.price}</span>
                            </div>
                            <button class="add-to-cart-btn ${addToCartBtnCss}" data-id="${el.id}">${addToCartBtnTxt}</button>
                        </div>
                    </div>`;
};