const  Joi = require('joi')

const categoryValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().required().trim().error(new Error('name is required!')),
        // image: Joi.string().trim().lowercase().required().error(new Error('image is required!')),

    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}
const productValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().required().trim().error(new Error('name is required!')),
        description: Joi.string().trim().required().trim().error(new Error('description is required!')),
        image: Joi.string().trim().lowercase().error(new Error('image is required!')),
        gallery: Joi.string().trim(),
        quantity: Joi.string().trim().required().trim().error(new Error('quantity is required!')),
        price: Joi.string().trim().required().trim().error(new Error('price is required!')),
        salePrice: Joi.string().trim(),
        unit: Joi.string().trim(),
        latitude: Joi.string().trim().required().trim().error(new Error('latitude is required!')),
        lognitude : Joi.string().trim().required().trim().error(new Error('lognitude is required!')),

    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message: error.message });
    })
}

module.exports = { categoryValidation,productValidation};
