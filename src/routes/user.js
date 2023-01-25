const  express = require('express')
const { signUp, logIn, otp_verification, forgot_password, reset_password, change_password } = require('../controllers/authentication')
const { near_by_you } = require('../controllers/user/nearByYou')
const { get_profile, update_profile } = require('../controllers/user/user')
const { userJWT, partial_userJWT } = require('../helpers/jwt')
const { signUpValidation, logInValidation, otpValidation, forgotPasswordValidation, changePasswordValidation, resetPasswordValidation } = require('../validation/user')

// import { authenticationController } from '../controllers'
// import { userJWT, partial_userJWT } from '../helpers'
// import * as validation from '../validation'
const router = express.Router()

router.post('/signup',signUpValidation,signUp)
router.post('/login',logInValidation,logIn)
router.post('/otp_verification',otpValidation,otp_verification)
router.post('/forgot_password',forgotPasswordValidation,forgot_password)
router.post('/reset_password',resetPasswordValidation,reset_password)
router.post('/change_password', userJWT ,changePasswordValidation,change_password)
router.get('/get_profile', userJWT ,get_profile)
router.put('/update_profile',userJWT, update_profile)


router.post('/near_by_you', partial_userJWT ,near_by_you)



module.exports = router 

