const productModal = require("../../database/models/product");
const  mongoose = require('mongoose')
const  getArea = require('../../common/index')
var config = require("config");


const near_by_you = async (req, res) => {
    try {
      let body = req.body;
      
      let location_data = await getArea.getArea({ lat:  body?.lat, long: body.long }, 50)
      console.log("location_data",location_data)

      if(location_data){
        let isAlready = await productModal.aggregate([
            {
                $match: {
                    latitude: { $gte: location_data.min.lat.toString(), $lte: location_data.max.lat.toString() },
                    lognitude: { $gte: location_data.min.long.toString(), $lte: location_data.max.long.toString() },               
                }
            },
           
         ])
          if(isAlready){
            return res
            .status(200)
            .json({ data: isAlready, message: "Near by Product get sucessfully" });
          }else{
            return res
            .status(400)
            .json({ data: {}, message: "Something went wrong" });
          }
      }
     
      
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

module.exports = {  near_by_you};