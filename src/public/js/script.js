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

    // let index = 0;
    // const slides = document.querySelectorAll(".dishes");
    
    // function changeSlide() {
    //     let currentSlide = slides[index]; // Nuvarande slide
    //     let nextIndex = (index + 1) % slides.length; // Nästa slide index
    //     let nextSlide = slides[nextIndex]; // Nästa slide element
    
    //     // Fade out nuvarande slide
    //     currentSlide.style.opacity = "0";
    
    //     setTimeout(() => {
    //         currentSlide.style.visibility = "hidden"; // Dölj den gamla sliden
    //         currentSlide.classList.remove("dishes-active");
    
    //         // Visa och fade in nästa slide
    //         nextSlide.style.visibility = "visible";
    //         nextSlide.classList.add("dishes-active");
    //         setTimeout(() => {
    //             nextSlide.style.opacity = "1";
    //         }, 50); // Liten delay för att säkerställa att visibility hunnit ändras
    
    //         // Uppdatera indexet
    //         index = nextIndex;
    //     }, 1000); // Låt fade-out ske under 1 sekund innan nästa slide visas
    // }
    
    // // Byt slide var tredje sekund
    // setInterval(changeSlide, 3000);
    
    // // Starta första sliden direkt
    // slides[index].style.visibility = "visible";
    // slides[index].style.opacity = "1";
    // slides[index].classList.add("dishes-active");
    
    
    
});