const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const productsAPIController = {
  list: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "category",
        },
      ],
    }).then((products) => {
      let respuesta = {
        meta: {
          status: 200,
          count: products.length,
          url: "api/products",
        },
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category.name,
          detail: `api/products/${product.id}`,
        })),
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        {
          association: "category",
        },
      ],
    }).then((product) => {
      let respuesta = {
        meta: {
          status: 200,
          total: product.length,
          url: "/api/products/:id",
        },
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category.name,
          price: product.price,
          weight: product.weight,
          stock: product.stock,
        },
      };
      res.json(respuesta);
    });
  },
};

module.exports = productsAPIController;
