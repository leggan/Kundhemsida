import express  from "express";
import Product from "../schema/productSchema.js";
import userModule from '../schema/userSchema.js'
const { User, userSchema } = userModule

const orderRoute = express.Router()

orderRoute.get('/orders', async (req, res) => {
    try {
        req.session.productId = productId
        const product = await Product.findById(req.session.productId)
        console.log(product)
        return res.render('order.ejs', {user: req.user, productId})
    } catch (error) {
        return res.status(500).json({message: 'Fel vid inhämtning av data!'})
    }
    
})

orderRoute.get('/api/orders', async (req, res) => {
    res.status(404).json({message: 'api orders'})
    console.log(req.headers)
})

orderRoute.post('/api/orders', (req, res) => {
    if (!req.session) {
        return res.status(401).json({ message: 'Du har ingen session, du är alltså inte inloggad' });
    }

    if (!req.session.products) {
        req.session.products = [];
    }

    req.session.products.push(req.body);
    const userProducts = req.session.products;
    req.session.save(err => {
        if (err) {
            console.error('Fel vid sessionssparning:', err);
            return res.status(500).json({ message: 'Kunde inte spara session' });
        }

        res.json({ message: 'Produkt tillagd', products: userProducts });
    });
});

orderRoute.post('/orders', async (req, res) => {

    try {
        const productId = req.session.productId
        const product = await Product.findById(productId)
        return res.json({productId})
    } catch (error) {
        return res.status(500).json({message: 'Fel vid inhämtning av data!'})
    }
})

export default orderRoute

