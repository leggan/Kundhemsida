function showPopup(message) {
    const popup = document.getElementById("popup-message");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000); // Dölj efter 3 sekunder
}

// Använd denna funktion när en produkt läggs till
