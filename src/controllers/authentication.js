const userModel = require("../database/models/user");
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
const jwt_token_secret = config.get('jwt_token_secret')

const signUp = async (req, res) => {
  try {
    let body = req.body;
    let isAlredy = await userModel.findOne({ email: body.email });
    const salt = await bcryptjs.genSaltSync(10)
    const hashPassword = await bcryptjs.hash(body.password, salt)
    delete body.password
    body.password = hashPassword
   

    if (isAlredy)
      return res
        .status(200)
        .json({ data:{}, message: "User already exists" });

    let response = await new userModel(body).save();
    const token = jwt.sign({
        _id: response._id,
        generatedOn: (new Date().getTime())
    }, jwt_token_secret)

    response ={
        _id : response._id,
        fullName : response.fullName,
        userName : response.userName,
        email : response.email,
        token
    }
    if (response)
      return res
        .status(200)
        .json({ data: response, message: "User signup successful" });
    else
      return res
        .status(200)
        .json({ data: response, message: "Oops! Something went wrong!" });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};

const logIn = async (req, res) => {
    try {
      let body = req.body;
      let isFound =await  userModel.findOne({ email: body?.email})
      if(!isFound) 
        return res
            .status(400)
            .json({ data: {}, message: "User not Found" });
      const passwordMatch = await bcryptjs.compare(body.password, isFound.password)
      const token = jwt.sign({
        _id: isFound._id,
        generatedOn: (new Date().getTime())
    }, jwt_token_secret)
    isFound ={
        _id : isFound._id,
        fullName : isFound.fullName,
        userName : isFound.userName,
        email : isFound.email,
        token
    }
      if(!passwordMatch) 
        return res
            .status(400)
            .json({ data: {}, message: "Invalid email or password" });
      else
        return res
           .status(200)
           .json({ data: isFound, message: "Login Sucessfull" })      
    } catch (error) {
        console.log("error",error)
      return res
        .status(500)
        .json({ data: error, message: "Internal Server Error!" });
    }
  };

module.exports = { signUp, logIn };
