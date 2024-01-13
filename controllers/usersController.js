const path = require("node:path");
const fs = require("node:fs");

const userFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const usersController = {
  register: (req, res) => {
    res.render("users/signup");
  },

  process: (req, res) => {
    const nombreImage = req.file.filename;
    const { nombre, email, telefono, password } = req.body;
    const newUser = {
      id: users.length + 1,
      nombre,
      email,
      image: nombreImage,
      telefono,
      password,
    };
    users.push(newUser);
    fs.writeFileSync("data/users.json", JSON.stringify(users), "utf-8");
    res.redirect("/signin");
  },
};

module.exports = usersController;
