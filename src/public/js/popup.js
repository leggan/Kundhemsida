async function showPopupAddProduct(message) {
    const products = await getData()
    console.log(products)
    const popup = document.getElementById("popup-message");
    const addBtns = document.querySelectorAll('#add-button')
    addBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            popup.textContent = products[index].name + ' är tillagd i kundkorgen'
            popup.classList.add("show");
            setTimeout(() => {
                popup.classList.remove("show");
            }, 5000); // Dölj efter 3 sekunder
        })
    })

;

}

showPopupAddProduct()

// Använd denna funktion när en produkt läggs till
