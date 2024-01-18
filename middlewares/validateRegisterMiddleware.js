const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("nombre")
    .notEmpty()
    .withMessage("Debes escribir tus Nombres y Apellido "),
  body("email")
    .notEmpty()
    .withMessage("Debes escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),
  body("telefono").notEmpty().withMessage("Debes escribir un teléfono"),
  body("password").notEmpty().withMessage("Debes que escribir una contraseña"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

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
