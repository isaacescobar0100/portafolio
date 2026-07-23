/*==========================================================
VXPLAY
EXPERIENCE.JS
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initHeroParallax();

    initSectionBackground();

    initImageReveal();

    initMagneticButtons();

    initProjectGlow();

});


/*==========================================================
HERO PARALLAX
==========================================================*/

function initHeroParallax(){

    const heroImage=document.querySelector(".hero-image");

    if(!heroImage) return;

    document.addEventListener("mousemove",(e)=>{

        const x=(e.clientX-window.innerWidth/2)*0.015;

        const y=(e.clientY-window.innerHeight/2)*0.015;

        heroImage.style.transform=

        `translate(${x}px,${y}px)`;

    });

}


/*==========================================================
SECTION BACKGROUND
==========================================================*/

function initSectionBackground(){

    const body=document.body;

    const sections=document.querySelectorAll("section");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                body.style.transition="background .8s ease";

            }

        });

    },{

        threshold:.4

    });

    sections.forEach(section=>observer.observe(section));

}


/*==========================================================
IMAGE REVEAL
==========================================================*/

function initImageReveal(){

    const images=document.querySelectorAll(".project-image img");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:.2

    });

    images.forEach(img=>observer.observe(img));

}


/*==========================================================
MAGNETIC BUTTON
==========================================================*/

function initMagneticButtons(){

    const buttons=document.querySelectorAll(

        ".btn-primary,.btn-secondary"

    );

    buttons.forEach(button=>{

        button.addEventListener("mousemove",(e)=>{

            const rect=button.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const moveX=(x-rect.width/2)*0.18;

            const moveY=(y-rect.height/2)*0.18;

            button.style.transform=

            `translate(${moveX}px,${moveY}px)`;

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

    const cards=document.querySelectorAll(".project");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.setProperty("--x",x+"px");

            card.style.setProperty("--y",y+"px");

        });

    });

}