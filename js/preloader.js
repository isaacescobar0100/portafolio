/*==========================================================
VXPLAY
PRELOADER.JS
==========================================================*/

(() => {

    /*======================================================
    DESBLOQUEO DE EMERGENCIA
    Pase lo que pase, el body nunca se queda bloqueado.
    ======================================================*/

    function unlock() {

        document.body.classList.remove("loading");

    }

    // Si algo falla (imagen rota, JS con error, etc.)
    // a los 4s el scroll se libera igual.
    const failsafe = setTimeout(unlock, 4000);

    document.addEventListener("DOMContentLoaded", () => {

        const loader = document.querySelector(".loader");

        // Sin markup de loader no hay nada que animar,
        // pero el body SÍ debe desbloquearse.
        if (!loader) {

            clearTimeout(failsafe);

            unlock();

            return;

        }

        const progress = loader.querySelector(".loader-progress");
        const percent = loader.querySelector(".loader-percent");

        let value = 0;

        const interval = setInterval(() => {

            value += 2;

            if (value > 100) value = 100;

            if (progress) progress.style.width = value + "%";

            if (percent) percent.textContent = value + "%";

            if (value < 100) return;

            clearInterval(interval);
            clearTimeout(failsafe);

            loader.classList.add("loaded");

            unlock();

            setTimeout(() => loader.remove(), 900);

        }, 12);

    });

    // Refuerzo: si la ventana termina de cargar y seguimos
    // bloqueados por cualquier motivo, liberamos.
    window.addEventListener("load", () => {

        setTimeout(unlock, 1500);

    });

})();
