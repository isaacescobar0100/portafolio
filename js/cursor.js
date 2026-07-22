/*==========================================================
CURSOR.JS
==========================================================*/

const cursor = document.createElement("div");

cursor.className = "cursor";

document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", e => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateCursor(){

    currentX += (mouseX - currentX) * .18;
    currentY += (mouseY - currentY) * .18;

    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animateCursor);

}

animateCursor();

/*==============================
HOVER EFFECT
==============================*/

const hoverElements = document.querySelectorAll(

    "a,button,.project,.skill-card,img"

);

hoverElements.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursor.classList.add("cursor-hover");

    });

    item.addEventListener("mouseleave",()=>{

        cursor.classList.remove("cursor-hover");

    });

});

/*==============================
CLICK
==============================*/

document.addEventListener("mousedown",()=>{

    cursor.classList.add("cursor-click");

});

document.addEventListener("mouseup",()=>{

    cursor.classList.remove("cursor-click");

});