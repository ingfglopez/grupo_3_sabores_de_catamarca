const express = require('express')
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.products);
router.get('/:id', productController.productDetail);

module.exports = router;