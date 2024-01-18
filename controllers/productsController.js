const path = require("node:path");
const fs = require("node:fs");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const categories = require("../data/categories.json");

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
    const product = {};
    res.render("products/productForm", {
      product,
      categories,
      action: "/products",
      title: "Nuevo producto",
    });
  },

  store: (req, res) => {
    const nameImage = req.file ? req.file.filename : "no-disponible.png";
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

    fs.writeFileSync("data/products.json", JSON.stringify(products), "utf-8");

    res.redirect("products");
  },

  update: (req, res) => {
    const product = products.find((producto) => producto.id == req.params.id);
    if (req.method == "GET") {
      res.render("products/productForm", {
        product,
        categories,
        action: `/products/${product.id}?_method=PUT`,
        title: "Editar producto",
      });
    } else {
      const indiceProducto = products.findIndex(
        (producto) => producto.id == req.params.id
      );
      const nameImage = req.file
        ? req.file.filename
        : products[indiceProducto].image;
      const { name, description, category, weight, stock, price } = req.body;
      const id = Number(req.params.id);
      const product = {
        id,
        name,
        description,
        image: nameImage,
        category,
        weight,
        stock,
        price,
      };

      /* products[indiceProducto].name = product.name;
      products[indiceProducto].description = product.description;
      products[indiceProducto].image = product.image;
      products[indiceProducto].category = product.category;
      products[indiceProducto].weight = product.weight;
      products[indiceProducto].stock = product.stock;
      products[indiceProducto].price = product.price; */
      products[indiceProducto] = product;

      fs.writeFileSync("data/products.json", JSON.stringify(products), "utf-8");

      res.redirect("/products");
    }
  },
  delete: (req, res) => {
    if (req.method == "GET") {
      const product = products.find((producto) => producto.id == req.params.id);
      res.render("products/product-delete", { product });
    } else {
      const indiceProducto = products.findIndex(
        (producto) => producto.id == req.params.id
      );
      products.splice(indiceProducto, 1);
      fs.writeFileSync("data/products.json", JSON.stringify(products), "utf-8");
      res.redirect("/products");
    }
  },
};

module.exports = productsController;
