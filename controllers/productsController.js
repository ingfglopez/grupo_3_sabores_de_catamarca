const categories = require('../data/categories.json')

const productsController = {

  products: (req, res) => {
    res.render('products/products')
  },
  detail: (req, res) => {
    // buscar product
    res.render('products/productDetail')
  },
  create: (req, res) => {
    if (req.method == 'GET') {
      res.render('/products/productForm', {
        categories
      })
    }    
  },
  update: (req, res) => {
    //
  },
  delete: (req, res) => {
    //
  },
}

module.exports = productsController;

