/*==========================================================
VXPLAY SOFTWARE STUDIO
main.js

NOTA: el header sticky, el menú activo y el menú hamburguesa
los maneja navbar.js. Aquí NO se duplican (antes ambos
archivos hacían toggle de la misma clase y se anulaban).
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initReveal();

    initSmoothScroll();

    initYear();

});


/*==========================================================
SCROLL REVEAL
==========================================================*/

function initReveal() {

    const elements = document.querySelectorAll(
        ".section-heading,.project,.about-image,.about-content,.trust-item"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

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

    const header = document.querySelector(".header");

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (e) => {

            const href = link.getAttribute("href");

            // "#" solo no es un selector válido: querySelector("#")
            // lanzaba excepción y rompía los botones "Ver Demo".
            if (!href || href === "#") return;

            let target = null;

            try {

                target = document.querySelector(href);

            } catch {

                return;

            }

            if (!target) return;

            e.preventDefault();

            // Si el menú móvil está abierto, el body tiene
            // overflow:hidden y el scroll no funcionaría.
            document.body.classList.remove("menu-open");

            const offset = (header ? header.offsetHeight : 90) + 12;

            window.scrollTo({

                top: target.getBoundingClientRect().top + window.scrollY - offset,

                behavior: "smooth"

            });

        });

    });

}


/*==========================================================
AÑO ACTUAL
==========================================================*/

function initYear() {

    const year = document.querySelector("#year");

    if (year) year.textContent = new Date().getFullYear();

}
