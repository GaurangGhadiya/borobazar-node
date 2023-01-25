const productModal = require("../../database/models/product");
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

const cloudinaryImageUploadMethod = async file => {
  return new Promise(resolve => {
      cloudinary.uploader.upload( file , (err, res) => {
        if (err)  return console.log("error uploading", err)
          resolve({
            res: res.secure_url
          }) 
        }
      ) 
  })
}

const add_product = async (req, res) => {
    try {
      let body = req.body;
      let isAlready = await productModal.findOne({name : body.name})
    //   console.log("isAlready",isAlready)
      if(!isAlready){
        let data = {}
        const file = req.files.image
        cloudinary.uploader.upload(file.tempFilePath,async (err, result) => {
           data = {
            image : result?.url,
            ...body
          }
          const urls = [];
          const files = req.files.gallery;
          for (const file of files) {
            console.log("file", file)
            const { tempFilePath } = file;
            const newPath = await cloudinaryImageUploadMethod(tempFilePath);
            urls.push(newPath);
          }
          
          const product ={ 
            ...req.body,
            gallery : urls.map( url => url.res ),
            image : result?.url
          };

          console.log("product",product)
          let response = await new productModal(product).save();
          if(response){
            return res
            .status(200)
            .json({ data: response, message: "Product added sucessfully" });
          }else{
            return res
            .status(400)
            .json({ data: response, message: "something went wrong" });
          }
        })
      }else{
        return res
        .status(400)
        .json({ data: {}, message: "Product already exist" });

      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

const get_product = async (req, res) => {
    try {
      let body = req.body;
      let isAlready = await productModal.find({})
      if(isAlready){
        return res
        .status(200)
        .json({ data: isAlready, message: "Product get sucessfully" });
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

module.exports = { add_product, get_product};