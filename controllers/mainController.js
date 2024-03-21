const db = require("../database/models");

const mainController = {

  home: (req, res) => {
    // Obtener los productos destacados/recientes
    db.Product.findAll().then(products => {
      res.render('home', { products })
    }).catch(error => {
      res.send(error);
    })
  },
  about: (req, res) => {
    res.render('about')
  }
}

module.exports = mainController;

