const  mongoose = require('mongoose')
const  jwt = require('jsonwebtoken')
const  config = require('config')
const userModel = require("../database/models/user");


const ObjectId = mongoose.Types.ObjectId
const jwt_token_secret = config.get('jwt_token_secret')

 const userJWT = async (req, res, next) => {
    let { authorization, userType } = req.headers,
        result
    if (authorization) {
        try {
            let isVerifyToken = jwt.verify(authorization, jwt_token_secret)
                result = await userModel.findOne({ _id: ObjectId(isVerifyToken?._id) })
            if (result) {
                req.headers.user = result
                return next()
            } else {
                return res
                .status(401)
                .json({ data: error, message: "Invalid Token!" });            }
        } catch (err) {
            return res
            .status(401)
            .json({ data: err, message: "Invalid Token!" });
        }
    } else {
        return res
        .status(401)
        .json({ data: {}, message: "We can't find tokens in header!" });
    }
}

module.exports = { userJWT};
