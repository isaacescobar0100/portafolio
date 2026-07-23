/*==========================================================
VXPLAY
CURSOR.JS
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    // No mostrar cursor personalizado en dispositivos táctiles
    if (window.matchMedia("(pointer: coarse)").matches) return;

    /*======================================================
    CREATE CURSOR
    ======================================================*/

    const cursor = document.createElement("div");
    cursor.className = "cursor";

    document.body.appendChild(cursor);

    /*======================================================
    VARIABLES
    ======================================================*/

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    /*======================================================
    MOUSE POSITION
    ======================================================*/

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.opacity = "1";

    });

    /*======================================================
    ANIMATION
    ======================================================*/

    function animate() {

        currentX += (mouseX - currentX) * 0.14;
        currentY += (mouseY - currentY) * 0.14;

        cursor.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);

    }

    animate();

    /*======================================================
    HOVER EFFECT
    ======================================================*/

    document.addEventListener("mouseover", (e) => {

        if (
            e.target.closest(
                "a,button,.btn-primary,.btn-secondary,.project,.service-card,.tech-item,img"
            )
        ) {

            cursor.classList.add("cursor-hover");

        }

    });

    document.addEventListener("mouseout", (e) => {

        if (
            e.target.closest(
                "a,button,.btn-primary,.btn-secondary,.project,.service-card,.tech-item,img"
            )
        ) {

            cursor.classList.remove("cursor-hover");

        }

    });

    /*======================================================
    CLICK
    ======================================================*/

    document.addEventListener("mousedown", () => {

        cursor.classList.add("cursor-click");

    });

    document.addEventListener("mouseup", () => {

        cursor.classList.remove("cursor-click");

    });

    /*======================================================
    WINDOW LEAVE
    ======================================================*/

    document.addEventListener("mouseleave", () => {

        cursor.style.opacity = "0";

    });

    document.addEventListener("mouseenter", () => {

        cursor.style.opacity = "1";

    });

});