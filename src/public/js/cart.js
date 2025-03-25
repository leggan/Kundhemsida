async function addToCart() {
    const response = await fetch('/api/meny')
    const products = await response.json()
    const addBtns = document.querySelectorAll('#add-button')
    addBtns.forEach((addBtn, index) => {
        const chosenProduct = addBtn.parentNode.parentNode.childNodes[3].textContent
        addBtn.addEventListener('click', async (e) => {
            if(chosenProduct === products[index].name) {
                const productId = products[index]._id
                console.log(productId)
                const response2 = await fetch('/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({productId})
                })
                const data = await response2.json()

            }
        })
    })

}

addToCart()



// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// cart.push({ product, price, quantity: 1 });
// localStorage.setItem("cart", JSON.stringify(cart));
// alert(`${product} har lagts till i kundkorgen!`);
