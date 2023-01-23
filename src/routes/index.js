"use strict"
const  express = require('express')
const  userStatus = require('../common')
const  userRouter = require('./user')
const  adminRouter = require('./admin')
let router = express.Router();

router.use('/user',  userRouter)
router.use('/admin',  adminRouter)


module.exports = router 
