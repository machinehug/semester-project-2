export default function createMenuInput(totalProducts) {

    const container = document.querySelector(".menu-input-container");
    container.innerHTML = `
            <div class="menu-input">
                <div class="input-wrapper">
                    <input class="search" type="search" placeholder="Search our menu...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <span>We have ${totalProducts} ice creams in total.</span>
            </div>`;
};