const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models/index");

module.exports = [
  body("nombre")
    .notEmpty()
    .withMessage("El Campo no puede estar vacio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Debe tener al menos 2 palabras "),

  body("username")
    .notEmpty()
    .withMessage("El Campo no puede estar vacio")
    .bail()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos"
    )
    .custom(async (value) => {
      const checkUser = await db.User.findOne({
        where: { username: value },
      });
      if (checkUser) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Debes escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido")
    .custom(async (value) => {
      const checkEmail = await db.Person.findOne({ where: { email: value } });
      if (checkEmail) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),
  body("telefono").notEmpty().withMessage("Debes escribir un teléfono"),

  body("password")
    .notEmpty()
    .withMessage("Debes que escribir una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/)
    .withMessage(
      "La contraseña deberá tener letras mayúsculas, minúsculas, al menos un número y un carácter especial."
    ),

  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!file) {
      throw new Error("Debes subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];
