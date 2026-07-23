/*==========================================================
VXPLAY
PRELOADER.JS
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    const progress = loader.querySelector(".loader-progress");
    const percent = loader.querySelector(".loader-percent");

    let value = 0;

    const interval = setInterval(() => {

        value++;

        if (progress) {

            progress.style.width = value + "%";

        }

        if (percent) {

            percent.textContent = value + "%";

        }

        if (value >= 100) {

            clearInterval(interval);

            loader.classList.add("loaded");

            document.body.classList.remove("loading");

            setTimeout(() => {

                loader.remove();

            }, 900);

        }

    }, 18);

});