/*==========================================================
VXPLAY
NAVBAR.JS
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    const header=document.querySelector(".header");
    const menu=document.querySelector(".menu");
    const navbar=document.querySelector(".navbar");

    if(!header || !menu || !navbar) return;

    /*======================================================
    MENU
    ======================================================*/

    menu.addEventListener("click",()=>{

        menu.classList.toggle("active");
        navbar.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    /*======================================================
    CLOSE MENU LINKS
    ======================================================*/

    navbar.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",closeMenu);

    });

    /*======================================================
    CLOSE CLICK OUTSIDE
    ======================================================*/

    document.addEventListener("click",(e)=>{

        if(

            navbar.classList.contains("active") &&

            !navbar.contains(e.target) &&

            !menu.contains(e.target)

        ){

            closeMenu();

        }

    });

    /*======================================================
    ESC KEY
    ======================================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeMenu();

        }

    });

    /*======================================================
    HEADER SCROLL
    ======================================================*/

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

    /*======================================================
    ACTIVE SECTION
    ======================================================*/

    const sections=document.querySelectorAll("section[id]");

    function updateMenu(){

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-140;
            const height=section.offsetHeight;

            if(window.scrollY>=top){

                current=section.id;

            }

        });

        navbar.querySelectorAll("a").forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll",updateMenu);

    updateMenu();

    /*======================================================
    RESIZE
    ======================================================*/

    window.addEventListener("resize",()=>{

        if(window.innerWidth>900){

            closeMenu();

        }

    });

    function closeMenu(){

        menu.classList.remove("active");
        navbar.classList.remove("active");
        document.body.classList.remove("menu-open");

    }

});