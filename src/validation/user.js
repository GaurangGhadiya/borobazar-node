const  Joi = require('joi')

 const signUpValidation = async (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().trim().required().trim().error(new Error('fullName is required!')),
        userName: Joi.string().trim().required().trim().error(new Error('userName is required!')),
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

module.exports = { signUpValidation, logInValidation };
