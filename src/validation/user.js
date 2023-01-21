const  Joi = require('joi')

 const signUpValidation = async (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().required().trim().error(new Error('first name is required!')),
        lastName: Joi.string().trim().required().trim().error(new Error('last name is required!')),
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().trim().required().trim().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}

const logInValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().trim().required().trim().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}

const otpValidation = async (req, res, next) => {
    const schema = Joi.object({
        otp: Joi.number().min(100000).max(999999).required().error(new Error('otp is required! & only is 6 digits')),
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),

    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}
const forgotPasswordValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}
const resetPasswordValidation = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().trim().lowercase().required().error(new Error('id is required!')),
        password: Joi.string().trim().required().trim().error(new Error('password is required!')),


    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}
const changePasswordValidation = async (req, res, next) => {
    const schema = Joi.object({
        old_password: Joi.string().trim().lowercase().required().error(new Error('id is required!')),
        new_password: Joi.string().trim().required().trim().error(new Error('password is required!')),


    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}

module.exports = { signUpValidation, logInValidation ,otpValidation,forgotPasswordValidation,changePasswordValidation,resetPasswordValidation};
