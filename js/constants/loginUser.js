import { baseUrl, authenticationUrl, tokenKey, userKey } from "./variables.js";
import { saveToLocalStorage } from "./handleStorage.js";
import getStrapiSettings from "./getStrapiSettings.js";
import displayMessage from "./displayMessage.js";

export default async function loginUser(username, password) {

    const url = baseUrl + authenticationUrl;

    const bodyData = JSON.stringify({ identifier: username, password: password });
    const method = "POST";
    const headersData = { "Content-Type": "application/json", };

    const strapiSettings = getStrapiSettings(bodyData, method, headersData);

    const errorMessageContainer = document.querySelector(".message");

    if (password.length === 0 || username.length === 0) {
        return errorMessageContainer.innerHTML = displayMessage("message-error", "Cannot be blank.");
    };

    try {
        const response = await fetch(url, strapiSettings);
        const json = await response.json();

        if (json.user) {
            saveToLocalStorage(tokenKey, json.jwt);
            saveToLocalStorage(userKey, json.user.username);
            location.href = "/account.html";
        };

        if (json.error) {
            return errorMessageContainer.innerHTML = displayMessage("message-error", "Invalid username/email and/or password. If you forgot any of those, contact your admin for help.");
        };
    } catch {
        return errorMessageContainer.innerHTML = displayMessage("message-error", "An error occurred. Please try again later.");
    };
};