const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let actual = 0;

function mostrarSlide(indice){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[indice].classList.add("active");
}

next.addEventListener("click", () => {

    actual++;

    if(actual >= slides.length){
        actual = 0;
    }

    mostrarSlide(actual);

});

prev.addEventListener("click", () => {

    actual--;

    if(actual < 0){
        actual = slides.length - 1;
    }

    mostrarSlide(actual);

});

setInterval(() => {

    actual++;

    if(actual >= slides.length){
        actual = 0;
    }

    mostrarSlide(actual);

}, 4000);