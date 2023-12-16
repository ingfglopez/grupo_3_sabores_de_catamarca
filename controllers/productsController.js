const categories = require("../data/categories.json");
const path = require("node:path");
const fs = require("node:fs");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
  products: (req, res) => {
    res.render("products/products", { data: products });
  },

  detail: (req, res) => {
    const { id } = req.params;
    const productDetail = products.find((p) => p.id === Number(id));
    res.render("products/productDetail", { data: productDetail });
  },

  create: (req, res) => {
    res.render("products/productForm");
  },

  store: (req, res) => {
    const nameImage = req.file.filename;
    const { name, description, category, weight, stock, price } = req.body;
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      image: nameImage,
      category,
      weight,
      stock,
      price,
    };
    products.push(newProduct);
    res.redirect("products");
  },

  update: (req, res) => {
    //
  },
  delete: (req, res) => {
    //
  },
};

module.exports = productsController;
