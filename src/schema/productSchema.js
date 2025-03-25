import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    source: String,
    category: String
});

const Product = mongoose.model('Product', productSchema)

export default Product
