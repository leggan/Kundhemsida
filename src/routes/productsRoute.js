import express from 'express'
import Product from '../schema/productSchema.js'

const productsRoute = express.Router()

productsRoute.get('/api/getProduct', async (req, res) => {
    try {
        const productIds = req.session.products;
        const data = [];
    
        // Loop genom varje produkt och hämta den från databasen
        for (let product of productIds) {
            const productId = product.productId;
            const productData = await Product.find({ _id: productId });
            data.push(productData); // Lägg till resultatet i arrayen
        }
    
        // Skicka tillbaka alla produktdata när alla har hämtats
        return res.json(data);
    } catch (error) {
        return res.json({message: 'Fel vid hämtning av produkter'})
    }
})

productsRoute.post('/api/removeProduct', async (req, res) => {
    try {
        console.log(req.body)
        const index = req.body.targetIndex
        const removedProductId = req.body.productId
        if(req.session) {
            const products = req.session.products;
            console.log('Session')
            if(removedProductId === products[index].productId) {
                products.splice(index, 1)
                req.session.products = products 
                req.session.save()
                return res.json({Boolean: true})
            }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
export default productsRoute

