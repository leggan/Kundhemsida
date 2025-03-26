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
export default productsRoute