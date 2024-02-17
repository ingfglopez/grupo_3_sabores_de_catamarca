const { check } = require('express-validator');

const validateLogin = [
  check('username')
    .notEmpty().withMessage('El usuario es obligatorio').bail(),
    //.isEmail().withMessage('El email ingresado no es valido'),
/*   check('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('El email ingresado no es valido'), */
  check('password')
    .notEmpty().withMessage('El contraseña es obligatoria').bail()
    .isLength({ min: 3 }).withMessage('La contraseña debe ser de al menos 3 caracteres')
];

module.exports = validateLogin;