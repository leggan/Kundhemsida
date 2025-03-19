document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    profileBtn.addEventListener("click", () => {
        profileDropdown.classList.toggle("show");
    });

    // Stäng dropdown när man klickar utanför
    // document.addEventListener("click", (event) => {
    //     if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
    //         profileDropdown.classList.remove("show");
    //     }
    // });

    
});


const slides = document.querySelectorAll(".dishes");
const dotItem = document.querySelectorAll('.item')
let slideIndex = 0;
let intervalId = null;


function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("dishes-active");
        dotItem[slideIndex].classList.add('active')
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("dishes-active");
    });
    dotItem.forEach(dot => {
        dot.classList.remove("active");
    });
    slides[slideIndex].classList.add("dishes-active");
    dotItem[slideIndex].classList.add('active')

}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}
