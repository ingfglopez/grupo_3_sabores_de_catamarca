const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const adminController = require('../controllers/adminController')
const isLogged = require('../middlewares/isLogged')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', [
  isLogged,
  isAdmin
], adminController.home)

/* router.get('/products', productsController.list)

router.get("/products/create", [
  isLogged,
  isAdmin
], productsController.create); */

module.exports = router