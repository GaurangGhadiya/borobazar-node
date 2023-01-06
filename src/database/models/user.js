const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: { type: String, default: null },
    userName: { type: String, default: null },
    email: { type: String, default: null, },
    password: { type: String, default: "admin2" },    
}, { timestamps: true }
)

 const userModel =new  mongoose.model('user', userSchema);
module.exports = userModel