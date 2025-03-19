document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    profileBtn.addEventListener("click", () => {
        profileDropdown.classList.toggle("show");
    });

    // Stäng dropdown när man klickar utanför
    document.addEventListener("click", (event) => {
        if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.classList.remove("show");
        }
    });

    let index = 0;
    const slides = document.querySelectorAll(".dishes");

    function changeSlide() {
        slides[index].classList.remove("dishes-active"); // Ta bort aktiv från nuvarande slide

        index = (index + 1) % slides.length; // Nästa slide

        slides[index].style.left = "100%"; // Startposition utanför till höger
        setTimeout(() => {
            slides[index].classList.add("dishes-active"); // Lägg till active på nästa slide
            slides[index].style.left = "0"; // Flytta in den nya sliden
        }, 50);
    }

    // Byt slide var tredje sekund
    setInterval(changeSlide, 3000);


});