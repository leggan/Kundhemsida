import express  from "express";
import Product from "../schema/productSchema.js";

const orderRoute = express.Router()

orderRoute.get('/orders', async (req, res) => {
    
    const productId = req.body.productId
    try {
        const product = await Product.findById(productId)
        console.log(product)
        return res.render('order.ejs', {user: req.user, product})
    } catch (error) {
        return res.status(500).json({message: 'Fel vid inhämtning av data!'})
    }
    
})

orderRoute.post('/orders', async (req, res) => {
    const productId = req.body.productId
    try {
        const product = await Product.findById(productId)
        console.log(product)
    } catch (error) {
        return res.status(500).json({message: 'Fel vid inhämtning av data!'})
    }
})

export default orderRoute

