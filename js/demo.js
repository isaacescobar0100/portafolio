/*==========================================================
VXPLAY SOFTWARE STUDIO
demo.js

Aviso antes de abrir un demo. Al pulsar "Ver Demo" se
muestra un modal explicando que es un entorno de ejemplo.

Cada botón "Ver Demo" puede llevar un data-demo-url:

  - Con URL real  -> el modal muestra "Continuar al demo".
  - Vacío o "#"   -> solo el mensaje y el botón "Entendido"
                     (el proyecto se ve nada más como muestra).

Para publicar un demo real, pon su enlace en el atributo:
  <a ... class="js-demo" data-demo-url="https://...">
==========================================================*/

document.addEventListener("DOMContentLoaded", initDemoModal);


function initDemoModal() {

    const modal = document.querySelector("#demo-modal");

    if (!modal) return;

    const continueBtn = modal.querySelector("#demo-modal-continue");

    const titleEl = modal.querySelector("#demo-modal-title");

    let lastFocus = null;

    document.querySelectorAll(".js-demo").forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            openModal(link);

        });

    });

    function openModal(link) {

        lastFocus = link;

        const url = (link.getAttribute("data-demo-url") || "").trim();

        // Personaliza el título con el nombre del proyecto.
        const project = link.closest(".project");

        const heading = project ? project.querySelector("h2") : null;

        titleEl.textContent = heading
            ? `Demo · ${heading.textContent.trim()}`
            : "Antes de continuar";

        // Solo mostramos "Continuar" si hay un demo real publicado.
        if (url && url !== "#") {

            continueBtn.href = url;

            continueBtn.style.display = "";

        } else {

            continueBtn.removeAttribute("href");

            continueBtn.style.display = "none";

        }

        modal.classList.add("is-open");

        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("demo-open");

    }

    function closeModal() {

        modal.classList.remove("is-open");

        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("demo-open");

        if (lastFocus) lastFocus.focus();

    }

    // Cerrar: overlay, botón X, "Entendido".
    modal.querySelectorAll("[data-demo-close]").forEach(el => {

        el.addEventListener("click", closeModal);

    });

    // Al continuar (nueva pestaña) cerramos el modal detrás.
    continueBtn.addEventListener("click", () => {

        if (continueBtn.getAttribute("href")) closeModal();

    });

    // Cerrar con Escape.
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape" && modal.classList.contains("is-open")) {

            closeModal();

        }

    });

}
