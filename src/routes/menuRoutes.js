import express  from "express";
import Product from "../schema/productSchema.js";

const menuRoute = express.Router()

menuRoute.get('/meny', async (req, res) => {
    try {
        const products = await Product.find();  // Hämta alla produkter från databasen
        res.json(products);  // Skicka produkterna som JSON
    } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        res.status(500).send("Fel vid hämtning av produkter.");
    }
});



export default menuRoute

