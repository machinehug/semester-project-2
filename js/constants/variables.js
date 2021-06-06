// urls
export const baseUrl = "http://localhost:1337/";
export const apiUrl = "products/";
export const authenticationUrl = "auth/local";
export const homeHeroUrl = "home/";

// storage
export const cartKey = "cart";
export const tokenKey = "token";
export const userKey = "username";

// faves
export const faveKey = "faves";

// cart
export const shippingCost = 0;

export const tax = function (items) {

    const tax = .25; // tax in %
    let sum = 0;

    items.forEach(item => {
        sum += (item.price * item.quantity) * tax;
    });

    return sum;
};