const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const adminController = require('../controllers/adminController')

router.get('/', adminController.home)
router.get('/products', productsController.list)

module.exports = router