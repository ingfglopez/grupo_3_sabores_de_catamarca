const db = require("../database/models");
const { Op } = require('sequelize');

const mainController = {

  home: (req, res) => {
    // Obtener los productos destacados/recientes
    db.Product.findAll({
      order: [
        ['id', 'desc']
      ],
      limit: 8
    }).then(products => {
      res.render('home', { products })
    }).catch(error => {
      res.send(error);
    })
  },
  search:(req,res)=>{
    const query = req.query.q.trim(); 
   
    db.Product.findAll(
       {
        where: {
          name: {
              [Op.like]: `%${query}%` 
          } 
      }
       
    }
    ).then (products => {
      
      res.render("productsDetalls", {products:products})
      
    } ).catch(error => {
      res.send(error);
    }) 
        
  },
  about: (req, res) => {
    res.render('about')
  }
}

module.exports = mainController;