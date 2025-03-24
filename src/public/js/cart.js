const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
    });
});

function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ product, price, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product} har lagts till i kundkorgen!`);
}

function viewCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Din kundkorg:", cart);
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Din kundkorg är tom!");
        return;
    }

    let order = {
        customerName: "Love", // Hämta från inloggning senare
        items: cart,
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        alert("Beställning genomförd!");
        localStorage.removeItem("cart");
    })
    .catch(error => console.error("Fel vid beställning:", error));
}


// Hämta beställningar från backend
fetch('http://localhost:3000/orders')
    .then(response => response.json())
    .then(orders => {
        const tableBody = document.querySelector('#orders-table tbody');
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.customerName}</td>
                <td>${order.items.map(item => item.product).join(', ')}</td>
                <td>${order.totalPrice} kr</td>
                <td>${order.status}</td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Fel vid hämtning av beställningar:', error));