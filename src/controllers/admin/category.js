// const userModel = require("../database/models/user");
const categoryModal = require("../../database/models/category");
const  mongoose = require('mongoose')

var config = require("config");

const ObjectId = mongoose.Types.ObjectId

const add_category = async (req, res) => {
    try {
      let body = req.body;
      let isAlready = await categoryModal.findOne({name : body.name})
      console.log("isAlready",isAlready)
      if(!isAlready){
        let response = await new categoryModal(body).save();

        return res
        .status(200)
        .json({ data: response, message: "category added sucessfully" });
       
      }else{
        return res
        .status(400)
        .json({ data: {}, message: "categpry already exist" });

      }
      
     
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

  module.exports = { add_category};
