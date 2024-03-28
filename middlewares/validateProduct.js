const { check } = require('express-validator');

const validateProduct = [
  check('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
    .isLength({ min: 5 }).withMessage('El nombre del producto debe contener al menos 5 caracteres'),
  check('description')
    .notEmpty().withMessage('La descripción es obligatoria').bail()
    .isLength({ min: 20 }).withMessage('La descripción es de al menos 20 caracteres'),
  check('image')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('El archivo de imagen es obligatorio')
      } else {
        const types = ['image/jpeg', 'image/gif', 'image/png']
        if (types.includes(req.file.mimetype)) {
          return '.png'; // return "non-falsy" value to indicate valid data"
        } else {
          //return false; // return "falsy" value to indicate invalid data
          //console.log('Error de formato imagen');
          throw new Error('Formato de imagen no valido')
        }
      }
    })
];

module.exports = validateProduct;