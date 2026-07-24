/*==========================================================
VXPLAY SOFTWARE STUDIO
carousel.js

Carrusel de imágenes para las tarjetas de proyecto.
Cada .carousel tiene varias .carousel__slide; se navega
con las flechas, los puntos o deslizando en táctil.

Los puntos se generan aquí según el número de slides, así
que agregar o quitar imágenes en el HTML no requiere tocar
este archivo.
==========================================================*/

document.addEventListener("DOMContentLoaded", initCarousels);


function initCarousels() {

    document.querySelectorAll("[data-carousel]").forEach(setupCarousel);

}


function setupCarousel(carousel) {

    const track = carousel.querySelector(".carousel__track");

    const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));

    const prev = carousel.querySelector(".carousel__nav--prev");

    const next = carousel.querySelector(".carousel__nav--next");

    const dotsWrap = carousel.querySelector(".carousel__dots");

    // Con una sola imagen no hay nada que navegar.
    if (slides.length <= 1) {

        carousel.classList.add("is-single");

        return;

    }

    let index = 0;

    const dots = slides.map((_, i) => {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.className = "carousel__dot";

        dot.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);

        dot.addEventListener("click", () => goTo(i));

        dotsWrap.appendChild(dot);

        return dot;

    });

    function goTo(target) {

        // Módulo que envuelve: pasa de la última a la primera y viceversa.
        index = (target + slides.length) % slides.length;

        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((dot, i) => {

            dot.classList.toggle("is-active", i === index);

        });

    }

    if (prev) prev.addEventListener("click", () => goTo(index - 1));

    if (next) next.addEventListener("click", () => goTo(index + 1));

    // Deslizamiento táctil.
    let startX = 0;

    let delta = 0;

    let dragging = false;

    track.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

        delta = 0;

        dragging = true;

    }, { passive: true });

    track.addEventListener("touchmove", (e) => {

        if (dragging) delta = e.touches[0].clientX - startX;

    }, { passive: true });

    track.addEventListener("touchend", () => {

        if (!dragging) return;

        dragging = false;

        // Umbral para no cambiar de imagen con un roce mínimo.
        if (Math.abs(delta) > 40) {

            goTo(index + (delta < 0 ? 1 : -1));

        }

    });

    goTo(0);

}
