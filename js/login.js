import createHeader from './components/createHeader.js';
import loginUser from './constants/loginUser.js';
import { isLoggedIn } from './constants/loggedInStatus.js';
import createFooter from './components/createFooter.js';

if (!isLoggedIn) {
    createHeader();
    createLoginForm();
    createFooter();
} else {
    location.href = "/account.html";
};

function createLoginForm() {

    const container = document.querySelector(".account-and-login-container");
    container.innerHTML = `
            
            <section>

                <h1>Login</h1>

                <form>
                    <div>
                        <label for="username">Username / email</label>
                        <input type="text" class="username" for="username" placeholder="Username or email...">
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" class="password" for="password" placeholder="Password...">
                    </div>
                    <button type="submit">LOGIN</button>
                    <div class="message"></div>
                </form>

            </section>

            <section>

                <h1>I'm a new member!</h1>

                <button>Sign up here!</button>

            </section>`;

    const form = document.querySelector("form");
    form.addEventListener("submit", submitForm);
};

function submitForm(event) {

    event.preventDefault();

    const username = document.querySelector(".username");
    const password = document.querySelector(".password");
    const message = document.querySelector(".message");

    message.innerHTML = "";

    // the username is case sensitive in Strapi, personally I chose a lowercase username
    // so to make sure the input value is not case sensitive, do .toLowerCase()
    const usernameValue = username.value.toLowerCase().trim();
    const passwordValue = password.value.trim();

    loginUser(usernameValue, passwordValue);
};