/*==========================================================
VXPLAY
CURSOR.JS
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*======================================================
    NO USAR EN TÁCTIL NI SIN HOVER REAL
    ======================================================*/

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    /*======================================================
    CREAR CURSOR (dot + ring, las clases que espera el CSS)
    ======================================================*/

    const dot = document.createElement("div");
    dot.className = "cursor-dot cursor-hidden";

    const ring = document.createElement("div");
    ring.className = "cursor-ring cursor-hidden";

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // Solo ahora ocultamos el cursor nativo: si este script
    // fallara, el usuario conserva su mouse de siempre.
    document.documentElement.classList.add("custom-cursor");

    /*======================================================
    VARIABLES
    ======================================================*/

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    /*======================================================
    POSICIÓN DEL MOUSE
    ======================================================*/

    window.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        // El punto sigue al mouse sin retraso.
        dot.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        dot.classList.remove("cursor-hidden");
        ring.classList.remove("cursor-hidden");

    }, { passive: true });

    /*======================================================
    ANIMACIÓN DEL ANILLO (suavizado)
    ======================================================*/

    function animate() {

        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        ring.style.transform =
            `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);

    }

    animate();

    /*======================================================
    HOVER
    ======================================================*/

    const HOVER_TARGETS =
        "a,button,input,textarea,select,.service-card,.tech-item,.project-stack span,.hero-stack span";

    document.addEventListener("mouseover", (e) => {

        if (e.target.closest(HOVER_TARGETS)) ring.classList.add("cursor-hover");

    });

    document.addEventListener("mouseout", (e) => {

        // Solo apagamos si de verdad salimos del elemento interactivo,
        // no al pasar entre sus hijos (esto causaba parpadeo).
        const from = e.target.closest(HOVER_TARGETS);

        if (!from) return;

        const to = e.relatedTarget && e.relatedTarget.closest
            ? e.relatedTarget.closest(HOVER_TARGETS)
            : null;

        if (from !== to) ring.classList.remove("cursor-hover");

    });

    /*======================================================
    CLICK
    ======================================================*/

    document.addEventListener("mousedown", () => ring.classList.add("cursor-click"));

    document.addEventListener("mouseup", () => ring.classList.remove("cursor-click"));

    /*======================================================
    SALIR / ENTRAR DE LA VENTANA
    ======================================================*/

    function hide() {

        dot.classList.add("cursor-hidden");
        ring.classList.add("cursor-hidden");

    }

    function show() {

        dot.classList.remove("cursor-hidden");
        ring.classList.remove("cursor-hidden");

    }

    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);

});
