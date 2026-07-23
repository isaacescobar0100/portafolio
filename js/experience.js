/*==========================================================
VXPLAY
EXPERIENCE.JS

Este archivo NO estaba enlazado en index.html, por eso las
imágenes de proyectos (opacity:0 a la espera de .visible)
nunca se mostraban.
==========================================================*/

/*
   Se marca el <html> cuanto antes: el CSS solo oculta las
   imágenes de proyecto si este script realmente cargó.
*/

document.documentElement.classList.add("reveal-ready");

document.addEventListener("DOMContentLoaded",()=>{

    initImageReveal();

    // Los efectos de puntero no aplican en táctil.
    if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    initHeroParallax();

    initMagneticButtons();

    initProjectGlow();

});


/*==========================================================
IMAGE REVEAL
==========================================================*/

function initImageReveal(){

    const images=document.querySelectorAll(".project-image img");

    if(!images.length)return;

    // Sin IntersectionObserver, mostrar todo de una vez.
    if(!("IntersectionObserver" in window)){

        images.forEach(img=>img.classList.add("visible"));

        return;

    }

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting)return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },{

        threshold:.15

    });

    images.forEach(img=>observer.observe(img));

    /*
       Backstop obligatorio: al saltar de golpe a una sección
       (los enlaces del menú hacen exactamente eso), las
       imágenes intermedias pasan de "debajo del viewport" a
       "encima" sin llegar a intersectar nunca, y el observer
       no dispara: se quedaban en opacity:0 para siempre.
       Aquí revelamos todo lo que ya quedó a la vista o atrás.
    */

    let ticking=false;

    function sweep(){

        ticking=false;

        let pending=0;

        images.forEach(img=>{

            if(img.classList.contains("visible"))return;

            if(img.getBoundingClientRect().top<window.innerHeight){

                img.classList.add("visible");

                observer.unobserve(img);

            }else{

                pending++;

            }

        });

        // Cuando ya no queda nada oculto, soltamos el listener.
        if(pending===0)window.removeEventListener("scroll",onScroll);

    }

    function onScroll(){

        if(ticking)return;

        ticking=true;

        requestAnimationFrame(sweep);

    }

    window.addEventListener("scroll",onScroll,{passive:true});

    setTimeout(sweep,1000);

}


/*==========================================================
HERO PARALLAX
==========================================================*/

function initHeroParallax(){

    const heroImage=document.querySelector(".hero-image");

    if(!heroImage)return;

    let raf=null;

    window.addEventListener("mousemove",(e)=>{

        if(raf)return;

        raf=requestAnimationFrame(()=>{

            const x=(e.clientX-window.innerWidth/2)*0.015;

            const y=(e.clientY-window.innerHeight/2)*0.015;

            heroImage.style.transform=`translate(${x}px,${y}px)`;

            raf=null;

        });

    },{passive:true});

}


/*==========================================================
MAGNETIC BUTTONS
==========================================================*/

function initMagneticButtons(){

    const buttons=document.querySelectorAll(".btn-primary,.btn-secondary");

    buttons.forEach(button=>{

        button.addEventListener("mousemove",(e)=>{

            const rect=button.getBoundingClientRect();

            const moveX=(e.clientX-rect.left-rect.width/2)*0.15;

            const moveY=(e.clientY-rect.top-rect.height/2)*0.15;

            button.style.transform=`translate(${moveX}px,${moveY}px)`;

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translate(0,0)";

        });

    });

}


/*==========================================================
PROJECT GLOW
==========================================================*/

function initProjectGlow(){

    document.querySelectorAll(".project").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            card.style.setProperty("--x",(e.clientX-rect.left)+"px");

            card.style.setProperty("--y",(e.clientY-rect.top)+"px");

        },{passive:true});

    });

}
