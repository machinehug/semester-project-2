import displayMessage from "./displayMessage.js";

export default function handleSearch(arr, updateCallback = function () { }) {

    const searchBar = document.querySelector(".search");
    searchBar.onkeyup = (event) => {

        const searchValue = event.target.value;

        const searchResults = arr.filter(el => {

            return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.description.toLowerCase().includes(searchValue.toLowerCase());
        });

        updateCallback(searchResults);

        if (searchResults.length === 0) {
            const container = document.querySelector(".products-wrapper .cards");
            container.innerHTML = displayMessage("", "No results. Try again.");
        };
    };
};