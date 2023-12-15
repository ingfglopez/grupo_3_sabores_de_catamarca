const express = require('express')
const router = express.Router();
const productController = require('../controllers/productsController');

// Create
router.get('/create', productController.create);
router.post('/', productController.create);

// Read
router.get('/', productController.products);
router.get('/:id', productController.detail);

// Update
router.get('/:id/edit', productController.update);
router.put('/:id', productController.update);

// Delete
router.get(':id/delete', productController.delete)
router.delete(':id', productController.delete)

module.exports = router;