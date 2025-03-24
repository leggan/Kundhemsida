import express  from "express";
import Product from "../schema/productSchema.js";

const orderRoute = express.Router()

orderRoute.get('/orders', (req, res) => {
    res.render('menu.ejs', {user: req.user})
})

orderRoute.post('/orders', async (req, res) => {
    const { customerName, items } = req.body;

    if (!customerName || !items || items.length === 0) {
        return res.status(400).send("Fyll i alla fält korrekt.");
    }

    // Beräkna totalpris
    const totalPrice = await calculateTotalPrice(items);

    // Skapa en ny order
    const order = new Order({
        customerName,
        items,
        totalPrice,
        status: 'Pending',
    });

    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);  // Skicka tillbaka den sparade ordern
    } catch (error) {
        console.error("Fel vid skapande av beställning:", error);
        res.status(500).send("Fel vid skapande av beställning.");
    }
});


async function calculateTotalPrice(items) {
    let total = 0;

    for (const item of items) {
        const product = await Product.findById(item.productId);  // Hämta produkt från databasen
        if (product) {
            total += product.price * item.quantity;  // Lägg till produktens pris * mängd
        }
    }

    return total;
}



export default orderRoute

