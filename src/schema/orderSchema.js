const orderSchema = new mongoose.Schema({
    customerName: String,
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }],
    totalPrice: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);


export default {orderSchema, Order}

