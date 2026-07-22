/*==========================================================
NAVBAR.JS
==========================================================*/

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const header = document.querySelector(".header");

if(menuButton){

    menuButton.addEventListener("click",()=>{

        menuButton.classList.toggle("active");

        navigation.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navigation.classList.remove("active");

        menuButton.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});

window.addEventListener("resize",()=>{

    if(window.innerWidth>768){

        navigation.classList.remove("active");

        menuButton.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

});

window.addEventListener("scroll",()=>{

    if(window.scrollY>20){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});