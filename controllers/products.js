
const productController = {

  products: (req, res) => {
    res.render('products/products')
  },
  productDetail: (req, res) => {
    // buscar product
    res.render('products/productDetail')
  },


}

module.exports = productController;

