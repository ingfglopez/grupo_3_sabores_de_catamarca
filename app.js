const express = require("express");
const path = require('path')
const mainRouter = require('./routes/main');
const productRouter = require('./routes/products');
const app = express();

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Servidor funcionando"));

app.use("/", mainRouter);
app.use("/products", productRouter);
/* app.get("/", (req, res) => {
  res.render("home");
}); */

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
