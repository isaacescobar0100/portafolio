/*==========================================================
ISAAC ESCOBAR PORTFOLIO
main.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    navbarScroll();

    revealElements();

    smoothScroll();

    activeLinks();

    backToTop();

});

/*==========================================================
NAVBAR
==========================================================*/

function navbarScroll(){

    const header = document.querySelector(".header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/*==========================================================
SCROLL REVEAL
==========================================================*/

function revealElements(){

    const elements = document.querySelectorAll(
        ".reveal,.reveal-left,.reveal-right,.reveal-scale"
    );

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>observer.observe(el));

}

/*==========================================================
SMOOTH SCROLL
==========================================================*/

function smoothScroll(){

    const links=document.querySelectorAll('a[href^="#"]');

    links.forEach(link=>{

        link.addEventListener("click",e=>{

            const target=document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            window.scrollTo({

                top:target.offsetTop-70,

                behavior:"smooth"

            });

        });

    });

}

/*==========================================================
ACTIVE MENU
==========================================================*/

function activeLinks(){

    const sections=document.querySelectorAll("section");

    const links=document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            const height=section.clientHeight;

            if(pageYOffset>=top){

                current=section.getAttribute("id");

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

}

/*==========================================================
BACK TO TOP
==========================================================*/

function backToTop(){

    const button=document.querySelector(".back-top");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==========================================================
TYPEWRITER
==========================================================*/

const title=document.querySelector(".typing");

if(title){

    const words=[

        "Full Stack Developer",

        "Frontend Developer",

        "Backend Developer"

    ];

    let wordIndex=0;

    let charIndex=0;

    let deleting=false;

    function type(){

        const current=words[wordIndex];

        if(!deleting){

            title.textContent=current.substring(0,charIndex++);

            if(charIndex>current.length){

                deleting=true;

                setTimeout(type,1800);

                return;

            }

        }else{

            title.textContent=current.substring(0,charIndex--);

            if(charIndex===0){

                deleting=false;

                wordIndex=(wordIndex+1)%words.length;

            }

        }

        setTimeout(type,deleting?40:90);

    }

    type();

}

/*==========================================================
PROJECT IMAGE PARALLAX
==========================================================*/

const projects=document.querySelectorAll(".project-image img");

window.addEventListener("scroll",()=>{

    projects.forEach(img=>{

        const speed=window.pageYOffset*.03;

        img.style.transform=`translateY(${speed}px) scale(1.02)`;

    });

});

/*==========================================================
CURRENT YEAR
==========================================================*/

const year=document.querySelector("#year");

if(year){

    year.textContent=new Date().getFullYear();

}

/*==========================================================
PRELOADER
==========================================================*/

window.addEventListener("load",()=>{

    const loader=document.querySelector(".loader");

    if(loader){

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.remove();

        },700);

    }

});

/*==========================================================
END
==========================================================*/