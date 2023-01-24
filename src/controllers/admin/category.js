// const userModel = require("../database/models/user");
const categoryModal = require("../../database/models/category");
const  mongoose = require('mongoose')
const  cloudinary = require('cloudinary').v2
var config = require("config");
const cloud_name = config.get("cloud_name");
const api_key = config.get("api_key");
const api_secret = config.get("api_secret");

cloudinary.config({ 
  cloud_name: cloud_name, 
  api_key: api_key, 
  api_secret: api_secret 
});

const ObjectId = mongoose.Types.ObjectId

const add_category = async (req, res) => {
    try {
      let body = req.body;
      let isAlready = await categoryModal.findOne({name : body.name})
      console.log("isAlready",isAlready)
      if(!isAlready){

        const file = req.files.image
        cloudinary.uploader.upload(file.tempFilePath,async (err, result) => {
          let data = {
            image : result?.url,
            name : body?.name
          }
          let response = await new categoryModal(data).save();
          if(response){
            return res
            .status(200)
            .json({ data: response, message: "category added sucessfully" });
          }else{
            return res
            .status(400)
            .json({ data: response, message: "something went wrong" });
          }
        })
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

const get_category = async (req, res) => {
    try {
      let body = req.body;
      let isAlready = await categoryModal.find({})
      if(isAlready){
        return res
        .status(200)
        .json({ data: isAlready, message: "Category get sucessfully" });
      }else{
        return res
        .status(400)
        .json({ data: {}, message: "Something went wrong" });
      }
      
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

module.exports = { add_category, get_category};
