const userModel = require("../database/models/user");
const  mongoose = require('mongoose')
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("config");
const jwt_token_secret = config.get("jwt_token_secret");
const node_mailer_email = config.get("node_mailer_email");
const node_mailer_password = config.get("node_mailer_password");
const nodemailer = require("nodemailer");

const ObjectId = mongoose.Types.ObjectId


const signUp = async (req, res) => {
  try {
    let body = req.body;
    let isAlredy = await userModel.findOne({ email: body.email });
    const salt = await bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hash(body.password, salt);
    delete body.password;
    body.password = hashPassword;

    if (isAlredy)
      return res.status(200).json({ data: {}, message: "User already exists" });

    let response = await new userModel(body).save();
    const token = jwt.sign(
      {
        _id: response._id,
        generatedOn: new Date().getTime(),
      },
      jwt_token_secret
    );

    response = {
      _id: response._id,
      firstName: isFound.firstName,
      lastName: isFound.lastName,
      email: response.email,
      token,
    };
    if (response)
      return res
        .status(200)
        .json({ data: response, message: "User signup successful" });
    else
      return res
        .status(200)
        .json({ data: response, message: "Oops! Something went wrong!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};

const logIn = async (req, res) => {
  try {
    let body = req.body;
    let isFound = await userModel.findOne({ email: body?.email });
    if (!isFound)
      return res.status(400).json({ data: {}, message: "User not Found" });
    const passwordMatch = await bcryptjs.compare(
      body.password,
      isFound.password
    );
    const token = jwt.sign(
      {
        _id: isFound._id,
        generatedOn: new Date().getTime(),
      },
      jwt_token_secret
    );
    isFound = {
      _id: isFound._id,
      firstName: isFound.firstName,
      lastName: isFound.lastName,
      email: isFound.email,
      token,
    };
    let locations = await userModel.findOneAndUpdate({ email: body?.email}, {latitude: body?.latitude, lognitude: body?.lognitude})
    if(!locations){
      return res
        .status(400)
        .json({ data: {}, message: "latitude and loginitude not stored in database" });
    }
    if (!passwordMatch)
      return res
        .status(400)
        .json({ data: {}, message: "Invalid email or password" });
    else
      return res
        .status(200)
        .json({ data: isFound, message: "Login Sucessfull" });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};

const otp_verification = async (req, res) => {
  try {
    let body = req.body;
    let isAlredy = await userModel.findOne(body);

    if (isAlredy) {
      let data ={
        _id : isAlredy._id,
        firstName : isAlredy.firstName,
        lastName : isAlredy.lastName,
        email : isAlredy.email,
      }
      return res
        .status(200)
        .json({ data: data, message: "OTP verify sucessfull!" });
    } else {
      return res
        .status(400)
        .json({ data: {}, message: "Please enter valid OTP" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};

const forgot_password = async (req, res) => {
  try {
    let body = req.body;
    let isAlredy = await userModel.findOne(body).select('email');

    if (isAlredy) {
     let newOtp =  await userModel.findOneAndUpdate(body, { otp : Math.floor(100000 + Math.random() * 900000) }, { new: true })

      if(newOtp){
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: node_mailer_email,
            pass: node_mailer_password,
          },
        });
  
        let info = await transporter.sendMail({
          from: node_mailer_email, // sender address
          to: body?.email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: `Forgot Password OTP :- ${newOtp?.otp}`, // plain text body
          // html: "<b>Borobazar</b>", // html body
        });
  
        transporter.sendMail(info,(err) => {
          if (err) {
            return res
            .status(400)
            .json({ data: err, message: "Please enter valid email" });
          }
          else{
            return res
          .status(200)
          .json({ data: isAlredy, message: "Email send sucessfull" });
  
          }
        })
      } else{
        return res
            .status(400)
            .json({ data: err, message: "OTP not generated" });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};

const reset_password = async (req, res) => {
  let body = req.body;
  try {
    const salt = await bcryptjs.genSaltSync(10)
    const hashPassword = await bcryptjs.hash(body.password, salt)
    delete body.password
    body.password = hashPassword
    let response = await userModel.findOneAndUpdate({ _id: ObjectId(body.id) }, {password : body.password}, { new: true })
    if(response){
      return res
          .status(200)
          .json({ data: {}, message: "Password reset sucessfull" });
    }else{
      return res
      .status(200)
      .json({ data: {}, message: "Error in reset password" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};
const change_password = async (req, res) => {
  let body = req.body;
  let user = req.header('user')

  try {
    let user_data = await userModel.findOne({ _id: ObjectId(user._id) }).select('password')
    const passwordMatch = await bcryptjs.compare(body.old_password, user_data.password)
    if (!passwordMatch) {
      return res
      .status(400)
      .json({ data: {}, message: "You have entered the old password wrong" });
    }
    const salt = await bcryptjs.genSaltSync(10)
    const hashPassword = await bcryptjs.hash(body.new_password, salt)
    let response = await userModel.findOneAndUpdate({ _id: ObjectId(user._id) }, { password: hashPassword }, { new: true })
    if(response){
      return res
      .status(200)
      .json({ data: {}, message: "Password has been changed" });
    }else{
      return res
      .status(400)
      .json({ data: {}, message: "During password changing error in database" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ data: error, message: "Internal Server Error!" });
  }
};
module.exports = { signUp, logIn, otp_verification, forgot_password ,reset_password,change_password};
