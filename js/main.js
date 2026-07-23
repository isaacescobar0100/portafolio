/*==========================================================
VXPLAY SOFTWARE STUDIO
main.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    initReveal();

    initSmoothScroll();

    initActiveMenu();

    initMobileMenu();

});


/*==========================================================
HEADER SCROLL
==========================================================*/

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/*==========================================================
SCROLL REVEAL
==========================================================*/

function initReveal() {

    const elements = document.querySelectorAll(

        ".section-heading,.project,.service-card,.step,.about-image,.about-content,.tech-item"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: .15

    });

    elements.forEach(el => {

        el.classList.add("reveal");

        observer.observe(el);

    });

}


/*==========================================================
SMOOTH SCROLL
==========================================================*/

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", (e) => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

}
/*==========================================================
ACTIVE MENU
==========================================================*/

function initActiveMenu() {

    const sections = document.querySelectorAll("section[id]");

    const links = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}


/*==========================================================
MOBILE MENU
==========================================================*/

function initMobileMenu() {

    const menu = document.querySelector(".menu");

    const navbar = document.querySelector(".navbar");

    if (!menu || !navbar) return;

    menu.addEventListener("click", () => {

        navbar.classList.toggle("show");

        menu.classList.toggle("active");

    });

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("show");

            menu.classList.remove("active");

        });

    });

}


/*==========================================================
PROJECT PARALLAX
==========================================================*/

function initProjectParallax() {

    const images = document.querySelectorAll(".project-image img");

    if (images.length === 0) return;

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        images.forEach(img => {

            const rect = img.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {

                const speed = (scroll - rect.top) * 0.015;

                img.style.transform = `translateY(${speed}px) scale(1.02)`;

            }

        });

    });

}

initProjectParallax();


/*==========================================================
TECH ITEMS HOVER
==========================================================*/

document.querySelectorAll(".tech-item").forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.style.transform = "translateY(-6px)";

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform = "translateY(0px)";

    });

});


/*==========================================================
PROJECT BUTTON EFFECT
==========================================================*/

document.querySelectorAll(".project-buttons a").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-4px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});


/*==========================================================
CURRENT YEAR
==========================================================*/

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}