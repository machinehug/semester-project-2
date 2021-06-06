export default function createFooter() {

    const footer = document.querySelector("footer");
    footer.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-wrapper-inner">
                <div style="width: 100%;">
                    <img src="img/nicecream-logo.png" alt="nicecream logo">
                </div>
                <div class="footer-nav-wrapper">
                    <div>
                        <h1>Ice cream</h1>
                        <nav>
                            <ul>
                                <li><a href="menu.html">Our menu</a></li>
                                <li><a href="">Inspo</a></li>
                                <li><a href="">Recipes</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h1>Learn more</h1>
                        <nav>
                            <ul>
                                <li><a href="">About us</a></li>
                                <li><a href="">Press</a></li>
                                <li><a href="">Join the fun!</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h1>Help</h1>
                        <nav>
                            <ul>
                                <li><a href="">FAQ</a></li>
                                <li><a href="">Ingredient info</a></li>
                                <li><a href="">Payment info</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Cookies and privacy</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div>
                    <div class="footer-socials">
                        <h1>Follow us online</h1>
                        <div>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-youtube"></i>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="fas fa-phone-volume"></i> 012345678 <br />
                            Every day 8AM - 4PM.
                        </div>
                        <div>
                            <i class="fas fa-envelope"></i>
                            fake@email.com <br />
                            We answer within 24 hours.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
                Copyright © 2001-2021 nicecream. is a fake website. All rights reserved.
            </div>
    </footer>`;
};