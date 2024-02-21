const path = require("node:path");
const fs = require("node:fs");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index");

//const userFilePath = path.join(__dirname, "../data/users.json");
//const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const usersController = {
  register: (req, res) => {
    db.State.findAll()
      .then((states) => {
        res.render("users/signup", { states });
      })
      .catch((error) => {
        res.send(error);
      });
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

    //    const allUsers = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
    //     let userInDB = allUsers.find((user) => user.email == req.body.email);

    // let userInDB = db.Person.findOne({ where: { email: req.body.email } });

    // if (userInDB) {
    //   return res.render("users/signup", {
    //     errors: {
    //       email: {
    //         msg: "Este email ya está registrado",
    //       },
    //     },
    //     oldData: req.body,
    //   });
    // }

    const nombreImage = req.file.filename;
    const { nombre, username, email, telefono, state_id, zipcode, address } =
      req.body;

    const newPerson = {
      name: nombre,
      email,
      image: nombreImage,
      phonenumber: telefono,
      zipcode,
      address,
      state_id,
    };

    // users.push(newUser);
    // fs.writeFileSync("data/users.json", JSON.stringify(users), "utf-8");
    // res.redirect("users/signin");

    // db.User.create(newUser)
    //   .then((user) => {
    //     console.log("Usuario creado", user);
    //     res.redirect("users/signin");
    //   })
    //   .catch((error) => {
    //     res.send(error);
    //   });

    db.Person.create(newPerson)
      .then((person) => {
        console.log("Persona creada", person);
        const newUser = {
          username,
          password: bcryptjs.hashSync(req.body.password, 10),
          person_id: person.id,
          rol_id: 1,
        };
        return db.User.create(newUser);
      })

      .then((user) => {
        console.log("Usuario creado", user);
        res.redirect("users/signin");
      })

      .catch((error) => {
        res.send(error);
      });
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
      //const allUsers = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
      //const userToLogin = allUsers.find((user) => user.email == req.body.email);

      db.User.findAll({
        where: {
          username: req.body.username,
        },
      })
        .then((users) => {
          if (users[0]) {
            console.log("users[0]", users[0]);

            const userFromDB = users[0].dataValues;

            const isOkThePassword = bcryptjs.compareSync(
              req.body.password,
              userFromDB.password
            );

            if (isOkThePassword) {
              // Guardo el usuario en la session
              delete userFromDB.password;
              req.session.userLogged = userFromDB;

              // Si se marco "Recordar usuario", guardamos una cookie
              if (req.body.remember_user) {
                // Vamos a recordar el usuario quince minutos
                res.cookie("username", req.body.username, {
                  maxAge: 1000 * 60 * 15,
                });
              }

              return res.redirect("/users/profile");
            }
          }

          // Si el password y/o usuario no son correctos, volvemos al form de login con un mensaje de error, lo enviamos en el campo username para no dar pistas de la credencial incorrecta
          res.render("users/signin", {
            errors: {
              username: {
                msg: "Las credenciales son incorrectas",
              },
            },
          });
        })
        .catch((error) => {
          //console.log('ERROR FINDALL');
          console.log(error);
          res.send(error);
        });
    }
  },

  profile: (req, res) => {
    //console.log(req.cookies.emailuser);
    console.log("User Logged in Session", req.session.userLogged);
    res.render("users/profile", {
      user: req.session.userLogged,
    });
  },

  signout: (req, res) => {
    res.clearCookie("username");
    req.session.destroy();
    return res.redirect("/");
  },

  //Listar Usuarios

  list: (req, res) => {
    db.User.findAll({
      include: [
        {
          association: "person",
        },
      ],
    })
      .then((users) => {
        res.render("users/list", { users });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  detail: (req, res) => {
    db.Person.findByPk(req.params.id)
      .then((person) => {
        res.render("users/detail", { person });
      })
      .catch((error) => {
        res.send(error);
      });
  },
};

module.exports = usersController;
