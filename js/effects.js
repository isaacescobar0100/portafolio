/*==========================================================
VXPLAY
EFFECTS.JS
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initProgressBar();

    initProjectTilt();

    initCounters();

    initStaggerReveal();

    initHeroAnimation();

});


/*==========================================================
SCROLL PROGRESS BAR
==========================================================*/

function initProgressBar(){

    const bar=document.createElement("div");

    bar.className="progress-bar";

    document.body.appendChild(bar);

    window.addEventListener("scroll",()=>{

        const scroll=window.scrollY;

        const height=document.documentElement.scrollHeight-window.innerHeight;

        const progress=(scroll/height)*100;

        bar.style.width=progress+"%";

    });

}


/*==========================================================
PROJECT TILT
==========================================================*/

function initProjectTilt(){

    const cards=document.querySelectorAll(".project");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=(x-rect.width/2)/28;

            const rotateX=(rect.height/2-y)/28;

            card.style.transform=`

                perspective(1200px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-8px)

            `;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="perspective(1200px) rotateX(0) rotateY(0)";

        });

    });

}


/*==========================================================
COUNTERS
==========================================================*/

function initCounters(){

    const counters=document.querySelectorAll("[data-counter]");

    if(counters.length===0)return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting)return;

            const el=entry.target;

            const target=parseInt(el.dataset.counter);

            let current=0;

            const increment=Math.ceil(target/60);

            const interval=setInterval(()=>{

                current+=increment;

                if(current>=target){

                    current=target;

                    clearInterval(interval);

                }

                el.textContent=current;

            },25);

            observer.unobserve(el);

        });

    });

    counters.forEach(counter=>observer.observe(counter));

}


/*==========================================================
STAGGER REVEAL
==========================================================*/

function initStaggerReveal(){

    const groups=document.querySelectorAll(

        ".services-grid,.process-grid,.tech-grid"

    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting)return;

            [...entry.target.children].forEach((item,index)=>{

                item.style.transitionDelay=`${index*120}ms`;

                item.classList.add("active");

            });

            observer.unobserve(entry.target);

        });

    },{

        threshold:.15

    });

    groups.forEach(group=>observer.observe(group));

}


/*==========================================================
HERO INTRO
==========================================================*/

function initHeroAnimation(){

    const hero=document.querySelector(".hero");

    if(!hero)return;

    hero.classList.add("hero-loaded");

}