import { getLocalStorage } from '../constants/handleStorage.js';
import { userKey } from "../constants/variables.js";
import { isLoggedIn } from '../constants/loggedInStatus.js';

export default function createAdminBanner() {

    if (isLoggedIn) {

        const username = getLocalStorage(userKey);

        const container = document.querySelector(".admin-banner-container");

        let accountTitle = `
                    <div class="account-title-container">
                        <h1>Account</h1>
                    </div>`;

        // code from https://stackoverflow.com/questions/4597050/how-to-check-if-the-url-contains-a-given-string/4597099
        if (window.location.href.indexOf("account") == -1) {
            accountTitle = "";
        };

        container.innerHTML = `
                    <h1 class="account-loggedin-title">You're logged in as ${username}.</h1>
                    ${accountTitle}`;
    } else {
        return false;
    };
};