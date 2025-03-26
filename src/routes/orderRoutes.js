import express  from "express";
import Product from "../schema/productSchema.js";
import userModule from '../schema/userSchema.js'
const { User, userSchema } = userModule

const orderRoute = express.Router()

orderRoute.get('/orders', async (req, res) => {
    try {
        return res.render('order.ejs', {user: req.user})
    } catch (error) {
        return res.status(500).json({message: 'Fel vid inhämtning av data!'})
    }
    
})

orderRoute.get('/api/orders', async (req, res) => {
    if(req.session.products) {
        const userProducts = req.session.products
        console.log(userProducts)
        return res.status(200).json(userProducts)
    } {
        return res.status(404).send({message: 'Fel vid inhämtning av data!'})
    }
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

