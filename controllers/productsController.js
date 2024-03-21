const path = require("node:path");
const fs = require("node:fs");
const db = require("../database/models/index");
const { validationResult } = require("express-validator");

const productsController = {

  list: (req, res) => {
    db.Product.findAll({
      order: [
        ['name', 'ASC']
      ],
      include: 'category'
    }).then(products => {
      //res.send(products)
      //console.log(req.flash('message'));
      //console.log(res.locals.mensajes);
      const { msgOk, msgError } = res.locals.mensajes
      res.render('admin/products', {
        products,
        msgOk,
        msgError
      })
    }).catch(error => {
      //console.log(error);
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
    db.Product.findByPk(req.params.id)
      .then((product) => {
        res.render("products/productDetail", { product });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  create: (req, res) => {
    db.Category.findAll()
      .then((categories) => {
        res.render("products/productFormAdm", {
          product: {},
          categories,
          action: "/products",
          title: "Nuevo producto",
          errors: {}
        });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  store: (req, res) => {

    const errors = validationResult(req);

    // Si hay errores mostamos nuevamente el form con los mensajes y los datos ingresados
    if (!errors.isEmpty()) {
      db.Category.findAll()
        .then((categories) => {
          //const product = {};
          console.log('Dibujando form product...');
          return res.render("products/productFormAdm", {
            title: "Nuevo producto",
            action: "/products",
            categories,
            errors: errors.mapped(),
            product: req.body,
          });
        })
    } else {
      const nameImage = req.file ? req.file.filename : "no-disponible.png";
      //const { name, description, category_id, weight, stock, price } = req.body;
      const { ...newProduct } = req.body;
      newProduct.image = nameImage
      newProduct.weight = (newProduct.weight.trim() == '') ? 0 : newProduct.weight.trim()
      newProduct.stock = (newProduct.stock.trim() == '') ? 0 : newProduct.stock.trim()
      newProduct.price = (newProduct.price.trim() == '') ? 0 : newProduct.price.trim()

      console.log(newProduct);
      db.Product.create(newProduct)
        .then((product) => {
          req.flash("msgOk", "El producto fue creado correctamente.");
          return res.redirect("/products");
        })
        .catch((error) => {
          res.send(error);
        });
    }
  },

  update: (req, res) => {
    //const product = products.find((producto) => producto.id == req.params.id);

    if (req.method == "GET") {
      db.Product.findByPk(req.params.id)
        .then((product) => {
          db.Category.findAll()
            .then((categories) => {
              res.render("products/productFormAdm", {
                product,
                categories,
                action: `/products/${product.id}?_method=PUT`,
                title: "Editar producto",
                errors: {}
              });
            })
            .catch((error) => {
              res.send(error);
            });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      //const indiceProducto = products.findIndex(
      //  (producto) => producto.id == req.params.id
      //);
      db.Product.findByPk(req.params.id).then((product) => {
        const image = req.file ? req.file.filename : product.image; // Si no se agrego una imagen se  deja la anterior
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
            id: req.params.id,
          },
        })
          .then((product) => {
            console.log("Producto modificado", product);
            req.flash("msgOk", "El producto fue modificado correctamente.");
            res.redirect("/products");
          })
          .catch((error) => {
            console.log(error);
            req.flash("msgError", "No se pudo modificar el producto");
            res.redirect("/products");
          });
      });
    }
  },

  delete: (req, res) => {
    if (req.method == "GET") {
      db.Product.findByPk(req.params.id)
        .then((product) => {
          res.render("products/product-delete", { product });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      db.Product.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((result) => {
          req.flash('msgOk', `El producto fue eliminado`)
          res.redirect("/products");
        })
        .catch((error) => {
          res.send(error);
        });
    }
  },
};

module.exports = productsController;
