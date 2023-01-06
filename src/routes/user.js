const  express = require('express')
const { signUp, logIn } = require('../controllers/authentication')
const { signUpValidation, logInValidation } = require('../validation/user')

// import { authenticationController } from '../controllers'
// import { userJWT, partial_userJWT } from '../helpers'
// import * as validation from '../validation'
const router = express.Router()

router.post('/signup',signUpValidation,signUp)
router.post('/login',logInValidation,logIn)

module.exports = router 

