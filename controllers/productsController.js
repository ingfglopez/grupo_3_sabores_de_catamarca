const path = require("node:path");
const fs = require("node:fs");
const db = require('../database/models/index');

const productsController = {

  list: (req, res) => {
    db.Product.findAll({
      order: [
        ['name', 'ASC']
      ]
    }).then(products => {
      res.send(products)
    }).catch(error => {
      console.log(error);
      res.send(error);
    })
  },

  products: (req, res) => {
    db.Product.findAll().then(products => {
      res.render("products/products", { products })
    }).catch(error => {
      res.send(error);
    })
  },

  detail: (req, res) => {
    const { id } = req.params;
    //const productDetail = products.find((p) => p.id === Number(id));
    db.Product.findByPk(req.params.id).then(product => {
      res.render("products/productDetail", { product });
    }).catch(error => {
      res.send(error);
    })
  },

  create: (req, res) => {
    db.Category.findAll().then(categories => {
      const product = {};
      res.render("products/productForm", {
        product,
        categories,
        action: "/products",
        title: "Nuevo producto",
      });
    }).catch(error => {
      res.send(error);
    })
  },

  store: (req, res) => {
    const nameImage = req.file ? req.file.filename : "no-disponible.png";
    const { name, description, category_id, weight, stock, price } = req.body;
    const newProduct = {
      name,
      description,
      image: nameImage,
      category_id,
      weight,
      stock,
      price,
    };

    db.Product.create(newProduct).then(product => {
      console.log('Producto creado', product);
      res.redirect("products");
    }).catch(error => {
      res.send(error);
    })

  },

  update: (req, res) => {
    //const product = products.find((producto) => producto.id == req.params.id);
    
    if (req.method == "GET") {
      console.log('Muestra form edit...');
      const product = db.Product.findByPk(req.params.id).then(product => {
        db.Category.findAll().then(categories => {
          res.render("products/productForm", {
            product,
            categories,
            action: `/products/${product.id}?_method=PUT`,
            title: "Editar producto",
          });          
        }).catch(error => {
          res.send(error);
        })
      }).catch(error => {
        res.send(error);
      })
    } else {
      //const indiceProducto = products.findIndex(
      //  (producto) => producto.id == req.params.id
      //);
      db.Product.findByPk(req.params.id).then(product => {
        const image = req.file ? req.file.filename : product.image;
        const { name, description, category_id, weight, stock, price } = req.body;
        const id = Number(req.params.id);
        const productEditado = {
          id,
          name,
          description,
          image,
          category_id,
          weight,
          stock,
          price,
        };

        db.Product.update(productEditado, {
          where: {
            id: req.params.id
          }
        }).then(product => {
          console.log('Producto modificado', product);
          res.redirect("/products");
        }).catch(error => {
          res.send(error);
        })
      })
    }
  },
  delete: (req, res) => {
    if (req.method == "GET") {
      db.Product.findByPk(req.params.id).then(product => {
        res.render("products/product-delete", { product });
      }).catch(error => {
        res.send(error);
      })
    } else {
      //const indiceProducto = products.findIndex(
      //  (producto) => producto.id == req.params.id
      //);
      //products.splice(indiceProducto, 1);
      //fs.writeFileSync("data/products.json", JSON.stringify(products), "utf-8");
      db.Product.destroy({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.redirect("/products");
      }).catch(error => {
        res.send(error);
      })
    }
  },
};

module.exports = productsController;
