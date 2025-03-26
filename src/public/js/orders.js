async function getUserProducts() {
    try {
        const response = await fetch('/api/getProduct');
        const products = await response.json();
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function createUserProducts() {
    const products = await getUserProducts(); // Vänta på att produkterna hämtas
    i = 0
    products.forEach((product) => {
        product.forEach((productDetails) => {
            const name = productDetails.name;
            const price = productDetails.price;
            const category = productDetails.category.split(" ")[0];
            const btn = document.querySelector(".proceed-btn");
            const productId = productDetails._id;

            // Skapa plan-box div
            const productDiv = document.createElement("div");
            productDiv.classList.add("plan-box");

            // Lägg till HTML
            productDiv.innerHTML = `
                <div class="plan-box-left">
                    <img src="/img/food-icon.png" alt="icon of a music symbol">
                    <div class="plan-details">
                        <h5 id="name">${name}</h5>
                        <p id="price">${price} kr</p>
                        <p id="productId">${productId}</p>
                    </div>
                </div>
                <a href="#" id="delete-product" data-product="${productId}" data-index=${i++}>Ta bort</a> `;

            // Lägg till elementet i DOM
            btn.insertAdjacentElement("beforebegin", productDiv);
        });
    });
}

// Event delegation för delete-knappar
document.body.addEventListener("click", async function (e) {
    if (e.target.id === "delete-product") {
        const productId = e.target.dataset.product
        const parentElement = e.target.parentElement
        const targetIndex = e.target.dataset.index
        const response = await fetch('/api/removeProduct', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({targetIndex, productId}),
        })
        const data = await response.json()
    }
});

// Kör funktionen för att skapa produkter
createUserProducts();
