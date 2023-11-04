const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor funcionando"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/views/signin.html");
});

app.get("/signout", (req, res) => {
  res.sendFile(__dirname + "/views/signout.html");
});
