const  express = require('express')
const { add_category } = require('../controllers/admin/category')
const { categoryValidation } = require('../validation/admin')

const router = express.Router()


router.post('/add_category',categoryValidation,add_category)


module.exports = router 
