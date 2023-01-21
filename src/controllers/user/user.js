const userModel = require("../../database/models/user");
const  mongoose = require('mongoose')
var config = require("config");

const ObjectId = mongoose.Types.ObjectId

const get_profile = async (req, res) => {
    let user = req.header('user')
  
    try {
      let user_data = await userModel.findOne({ _id: ObjectId(user._id) }).select('_id firstName lastName email')
      
      if(user_data){
        return res
        .status(200)
        .json({ data: user_data, message: "Profile get sucessfull" });
      }else{
        return res
        .status(400)
        .json({ data: {}, message: "We couldn't find the profile you requeste" });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

  module.exports = {get_profile}