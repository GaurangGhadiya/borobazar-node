const  Joi = require('joi')

const categoryValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().required().trim().error(new Error('name is required!')),
        image: Joi.string().trim().lowercase().required().error(new Error('image is required!')),

    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}

module.exports = { categoryValidation};
