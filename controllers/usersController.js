const path = require("node:path");
const fs = require("node:fs");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const userFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const usersController = {
  register: (req, res) => {
    res.render("users/signup");
  },

  process: (req, res) => {
    //revisamos que el ingreso de datos no tenga errores
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/signup", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    //revisamos que el email no este ya registrado

    const allUsers = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
    let userInDB = allUsers.find((user) => user.email == req.body.email);

    if (userInDB) {
      return res.render("users/signup", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    const nombreImage = req.file.filename;
    const { nombre, email, telefono, password } = req.body;
    const newUser = {
      id: users.length + 1,
      nombre,
      email,
      image: nombreImage,
      telefono,
      password: bcryptjs.hashSync(req.body.password, 10),
    };
    users.push(newUser);
    fs.writeFileSync("data/users.json", JSON.stringify(users), "utf-8");
    res.redirect("users/signin");
  },

  signin: (req, res) => {
    if (req.method == "GET") {
      res.render("users/signin");
    } else if (req.method == "POST") {
      const errors = validationResult(req);

      // Si hay errores mostamos nuevamente el form con los mensajes y los datos ingresados
      if (!errors.isEmpty()) {
        return res.render("users/signin", {
          errors: errors.mapped(),
          oldData: req.body,
        });
      }

      // Comprobamos que el email no se encuentre registrado
      //const userToLogin = User.findByField('email', req.body.email);
      const allUsers = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
      const userToLogin = allUsers.find((user) => user.email == req.body.email);

      if (userToLogin) {
        const isOkThePassword = bcryptjs.compareSync(
          req.body.password,
          userToLogin.contraseña
        );
        if (isOkThePassword) {
          delete userToLogin.password;

          // Guardo el usuario en la session
          req.session.userLogged = userToLogin;

          // Si se marco "Recordar usuario", guardamos una cookie
          if (req.body.remember_user) {
            // Vamos a recordar el usuario quince minutos
            res.cookie("emailuser", req.body.email, { maxAge: 1000 * 60 * 15 });
          }

          return res.redirect("/users/profile");
        }

        // Si el password no es correcto, volvemos al form de login con un mensaje de error, lo enviamos en el campo email para no dar pistas de la credencial incorrecta
        return res.render("users/signin", {
          errors: {
            email: {
              msg: "Las credenciales son incorrectas",
            },
          },
        });
      }

      return res.render("users/login", {
        errors: {
          email: {
            msg: "Las credenciales son incorrectas",
          },
        },
      });
    }
  },

  profile: (req, res) => {
    //console.log(req.cookies.emailuser);
    res.render("users/profile", {
      user: req.session.userLogged,
    });
  },

  signout: (req, res) => {
    res.clearCookie("emailuser");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
