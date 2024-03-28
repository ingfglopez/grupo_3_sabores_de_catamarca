const { check } = require('express-validator');
const db = require("../database/models/index");

const validatePerson = [
  check('name')
    .notEmpty().withMessage('El nombre y apellido son obligatorios').bail()
    .isLength({ min: 2 }).withMessage('El nombre y apellido deben ser de al menos 2 caracteres'),
  check("email")
    .notEmpty().withMessage("Debes escribir un correo electrónico").bail()
    .isEmail().withMessage("Debes escribir un formato de correo válido")
    .custom(async (value, { req }) => {
      const person = await db.Person.findOne({
        where: {
          email: value
        }
      });
      if (person && (person.id != req.params.id)) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),
/*   check('image')
    .custom((value, { req }) => {

      if (!req.file) {
        throw new Error('El archivo de imagen es obligatorio')
      } else {
        if (req.file.mimetype === 'image/png') {
          return '.png'; // return "non-falsy" value to indicate valid data"
        } else {
          //return false; // return "falsy" value to indicate invalid data
          console.log('Error de formato imagen');
          throw new Error('Solo se permiten images en formato PNG')
        }
      }
    }) */
];

module.exports = validatePerson;