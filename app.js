const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, () => console.log("Servidor funcionando"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("users/signup");
});

app.get("/signin", (req, res) => {
  res.render("users/signin");
});

app.get("/signout", (req, res) => {
  res.render("home");
});

app.get("/productDetail", (req, res) => {
  res.render("products/productDetail");
});

app.get("/productCart", (req, res) => {
  res.render("products/productCart");
});

app.get("/productForm", (req, res) => {
  res.render("products/productForm");
});
