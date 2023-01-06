"use strict"
const  express = require('express')
const  userStatus = require('../common')
const  userRouter = require('./user')
let router = express.Router();

router.use('/user',  userRouter)


module.exports = router 
