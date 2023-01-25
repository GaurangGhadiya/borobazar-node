const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null, },
    password: { type: String, default: null }, 
    phoneNumber: { type: String, default: null }, 
    latitude: { type: Number, default: null }, 
    lognitude: { type: Number, default: null }, 
    otp : {type: String, default: Math.floor(100000 + Math.random() * 900000)}   
}, { timestamps: true }
)

 const userModel =new  mongoose.model('user', userSchema);
module.exports = userModel