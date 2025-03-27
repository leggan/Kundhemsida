async function getData() {
    const response = await fetch('/api/meny');
    const products = await response.json();
    return products
}

async function fetchData() {
    try {
        const products = await getData()
        const productTitles = document.querySelectorAll('#product-title')
        const productDescriptions = document.querySelectorAll('#description')
        const productPrices = document.querySelectorAll('#product-price')
        const productImages = document.querySelectorAll('#product-image')
        const sortButtons = document.querySelectorAll('.select-container button')
        const galleryItems = document.querySelectorAll('.gallery-item')
        console.log(products)

        galleryItems.forEach((galleryItem, index) => {
            if(products[index]) {
                galleryItem.dataset.category = products[index].category + ' Alla'
            }
        })

        productTitles.forEach((productTitle, index) => {
            if(products[index]) {
                productTitle.textContent = products[index].name
            }
        })
        productDescriptions.forEach((productDescription, index) => {
            if(products[index]) {
                productDescription.textContent = products[index].description

            }
        })
        productPrices.forEach((productPrice, index) => {
            if(products[index]) {
                productPrice.textContent = products[index].price + ' kr'
            }
        })
        productImages.forEach((productImage, index) => {
            if(products[index]) {
                productImage.src = products[index].source
            }
        })
        
        
        sortButtons.forEach(sortButton => {
            sortButton.addEventListener('click', () => {
                const selectedCategory = sortButton.dataset.category;
                galleryItems.forEach(galleryItem => {
                    const productCategory = galleryItem.dataset.category.split(" ")[0]
                    if (selectedCategory == 'Alla' || selectedCategory == productCategory ) {
                        galleryItem.style.display = 'flex'
                    } else {
                        galleryItem.style.display = 'none'
                    }
                });
            });
        });
        

    } catch (error) {
        console.error("Fel vid hämtning av data", error);
    }
}


fetchData();

