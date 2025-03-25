import express  from "express";
import Product from "../schema/productSchema.js";

const menuRoute = express.Router()

menuRoute.get('/meny', async (req, res) => {
    res.render('menu.ejs', {user: req.user}) 
});


menuRoute.get('/api/meny', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // Skickar JSON när frontend anropar detta
    } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        res.status(500).json({ error: "Fel vid hämtning av produkter." });
    }
});


export default menuRoute

