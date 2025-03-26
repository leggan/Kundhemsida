const deleteBtns = {}

async function getUserProducts() {
    try {
        const response = await fetch('/api/getProduct')
        const products = await response.json()

        products.forEach((product, index) => {
            product.forEach((productDetails, index, array) => {
                const name = productDetails.name
                const price = productDetails.price
                const category = productDetails.category.split(" ")[0] 
                const btn = document.querySelector('.proceed-btn')
                const productId = productDetails._id
                // PLANBOX DIV
                const productDiv = document.createElement('div')
                // PLANBOX CLASS
                productDiv.classList.add('plan-box')
                // PLANBOX HTML
                const productHTML = `
                    <div class="plan-box-left">
                        <img src="/img/food-icon.png" alt="icon of a music symbol">
                        <div class="plan-details">
                            <h5 id="name">${name}</h5>
                            <p id="price">${price + ' kr'}</p>
                            <p id="productId">${productId}</p>
                        </div>
                    </div>
                    <a href="#" id="delete-product" data-product=${productId}>Ta bort</a> `   
                // ADD PLANBOX HTML TO PLANBOX DIV
                productDiv.innerHTML += productHTML
                btn.insertAdjacentElement('beforebegin', productDiv)
            })
        })
    } catch (error ) {
        return console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    async function deleteProduct() {
        try {
            const deleteBtns = document.getElementById('delete-product')
            console.log(deleteBtns)
            deleteBtns.forEach((btn, index) => {
                btn.addEventListener('click', (e) => {
                    console.log('clicked')
                })
            })
        } catch(error) {
            console.log(error)
        }
    }
})

getUserProducts()