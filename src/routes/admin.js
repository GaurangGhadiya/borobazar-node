const  express = require('express')
const { add_category, get_category } = require('../controllers/admin/category')
const { add_product, get_product } = require('../controllers/admin/product')
const { categoryValidation, productValidation } = require('../validation/admin')

const router = express.Router()


router.post('/add_category',categoryValidation,add_category)
router.get('/get_category',get_category)
router.post('/add_product',productValidation, add_product)
router.get('/get_product' ,get_product)


module.exports = router 
