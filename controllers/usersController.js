const path = require("node:path");
const fs = require("node:fs");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index");

const usersController = {
  //Cargar Formulario para Registrar User
  register: (req, res) => {
    db.State.findAll()
      .then((states) => {
        res.render("users/signup", { states });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  //Procesar Formulario para Registrar User
  process: (req, res) => {
    //revisamos que el ingreso de datos no tenga errores
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/signup", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const nombreImage = req.file.filename;
    const { nombre, username, email, telefono, state_id, zipcode, address } = req.body;

    const newPerson = {
      name: nombre,
      email,
      image: nombreImage,
      phonenumber: telefono,
      zipcode,
      address,
      state_id: 1,
    };

    db.Person.create(newPerson)
      .then((person) => {
        console.log("Persona creada", person);
        const newUser = {
          username,
          password: bcryptjs.hashSync(req.body.password, 10),
          person_id: person.id,
          rol_id: 2, // por defecto tipo cliente
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
        include: [
          { association: 'person' }
        ]
      })
        .then((users) => {
          if (users[0]) {
            //console.log("users[0]", users[0]);

            const userFromDB = users[0].dataValues;

            const isOkThePassword = bcryptjs.compareSync(
              req.body.password,
              userFromDB.password
            );

            if (isOkThePassword) {
              // Guardo el usuario en la session
              delete userFromDB.password;
              req.session.userLogged = userFromDB;
              console.log('LOCALS', res.locals);
              
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
        const { msgOk, msgError } = res.locals.mensajes
        res.render("admin/users", {
          users,
          msgOk,
          msgError
        });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  detail: (req, res) => {
    db.Person.findByPk(req.params.id, {
      include: [{ association: "user" }],
    })
      .then((person) => {
        res.render("users/detail", { person });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  /*   edit: (req, res) => {
      console.log(req.params.id);
      db.Person.findByPk(req.params.id, {
        include: [{ association: "user" }],
      }).then((Person) => {
        //res.render("users/edit", { person: Person });
        console.log(Person);
        res.render("users/edit", { person: Person });
      });
    }, */

  edit: (req, res) => {
    db.User.findByPk(req.params.id, {
      include: [
        { association: 'person' }
      ]
    })
      .then(user => {
        //console.log(user);
        //req.session.user_id = user.id
        //req.session.username = user.username
        //req.session.user = user
        //console.log(req.session.user);
        //console.log(req.session.username);
        res.render('users/edit', {
          //user: req.session.user
          user
        })
      })
      .catch(error => {
        console.log(error);
        res.send('Error')
      })
  },

  update: (req, res) => {

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      //console.log(req.body);
      //console.log(req.session.user);
      return res.render("users/edit", {
        errors: resultValidation.mapped(),
        //oldData: req.body,
        user: req.body
      });
    }

    db.Person.findByPk(req.params.id)
      .then((person) => {
        const image = req.file ? req.file.filename : person.image;
        const { name, email, telefono, state_id, zipcode, address } = req.body;

        const personEdited = {
          name,
          email,
          image,
          phonenumber: telefono,
          zipcode,
          address,
          state_id: 1,
        };

        db.Person.update(personEdited, {
          where: {
            id: req.params.id,
          },
        });
      })
      .then((user) => {
        console.log("Usuario modificado", user);
        req.flash("msgOk", "El usuario fue modificado correctamente.");
        //res.redirect("/users/list");
        res.redirect("/users");
      })
      .catch((error) => {
        req.flash("msgError", "No se pudo modificar el usuario");
        res.send(error);
      });
  },

  delete: (req, res) => {
    if (req.method == "GET") {
      db.User.findByPk(req.params.id, {
        include: [
          { association: 'person' }
        ]
      })
        .then((user) => {
          res.render("users/user-delete", { user });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {

      console.log(req.params.id);
      console.log(req.body);

      db.User.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((result) => {
          db.Person.destroy({
            where: {
              id: req.body.person_id
            }
          })
            .then(result => {
              req.flash('msgOk', `El usuario fue eliminado`)
              res.redirect("/users");
            })
        })
        .catch((error) => {
          res.send(error);
        });
    }
  }
};

module.exports = usersController;
