const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: String, default: null },
    gallery: { type: Array, default: [] },
    quantity: { type: String, default: null },
    price: { type: String, default: null },
    salePrice: { type: String, default: null },
    unit: { type: String, default: null },
    latitude: { type: Number, default: null }, 
    lognitude: { type: Number, default: null }, 
    
}, { timestamps: true }
)

 const productModel =new  mongoose.model('product', productSchema);
module.exports = productModel