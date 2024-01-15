const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const emailInCookie = require('./middlewares/emailInCookie');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

// Middleware de session
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: false
}));

// Determinar si se recordo al usuario al momento de loguear
app.use(emailInCookie);

// Para sabe en las templates si hay un usuario logueado
app.use(userLoggedMiddleware);

// Template engine
app.set("view engine", "ejs");

// Rutas
app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Servidor funcionando"));

// app.get("/signup", (req, res) => {
//   res.render("users/signup");
// });

// app.get("/signout", (req, res) => {
//   res.render("home");
// });

/* app.get("/productDetail", (req, res) => {
  res.render("products/productDetail");
}); */

app.get("/productCart", (req, res) => {
  res.render("products/productCart");
});

app.get("/productForm", (req, res) => {
  res.render("products/productForm");
});
