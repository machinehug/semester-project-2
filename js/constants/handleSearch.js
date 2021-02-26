import createMenu from "../components/createMenu.js";
import displayMessage from "./displayMessage.js";

export default function handleSearch(arr) {

    const searchBar = document.querySelector(".search");

    searchBar.onkeyup = (event) => {

        const searchValue = event.target.value;

        const searchResults = arr.filter(el => {

            return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.description.toLowerCase().includes(searchValue.toLowerCase());
        });

        createMenu(searchResults);

        if (searchResults.length === 0) {
            const container = document.querySelector(".products-wrapper .cards");
            container.innerHTML = displayMessage("", "No results. Try again.");
        };
    };
};