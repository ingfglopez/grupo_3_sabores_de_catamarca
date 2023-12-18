const express = require("express");
const path = require('path')
const methodOverride = require('method-override');

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template engine
app.set("view engine", "ejs");

// Rutas
app.use("/", mainRouter);
app.use("/products", productsRouter);

app.listen(3000, () => console.log("Servidor funcionando"));

app.get("/signup", (req, res) => {
  res.render("users/signup");
});

app.get("/signin", (req, res) => {
  res.render("users/signin");
});

app.get("/signout", (req, res) => {
  res.render("home");
});

/* app.get("/productDetail", (req, res) => {
  res.render("products/productDetail");
}); */

app.get("/productCart", (req, res) => {
  res.render("products/productCart");
});

app.get("/productForm", (req, res) => {
  res.render("products/productForm");
});
