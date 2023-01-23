const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, default: null },
    image: { type: String, default: null },
    
}, { timestamps: true }
)

 const categoryModel =new  mongoose.model('category', categorySchema);
module.exports = categoryModel