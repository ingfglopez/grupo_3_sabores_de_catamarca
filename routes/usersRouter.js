const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validations = require("../middlewares/validateRegisterMiddleware");
const validateLogin = require("../middlewares/validateLogin");
const validatePerson = require('../middlewares/validatePerson')
const isLogged = require("../middlewares/isLogged");
const isGuest = require("../middlewares/isGuest");

const path = require("path");
const multer = require("multer");
const isAdmin = require("../middlewares/isAdmin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "public/images/users";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const imageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

router.get('/', [
  isLogged,
  isAdmin
], usersController.list)

//Acceder al Formulario de registro
router.get("/register", isGuest, usersController.register);

// Form de login
router.get("/signin", isGuest, usersController.signin);

// Procesar el login
router.post("/signin", validateLogin, usersController.signin);

//Procesar Formulario
router.post("/", upload.single("image"), validations, usersController.process);

// Ruta a la pagina de perfil del usuario
router.get("/profile", isLogged, usersController.profile);

// Ruta para desloguear
router.get("/signout", isLogged, usersController.signout);

// Ruta Lista de Usuarios
//router.get("/list", isLogged, usersController.list);

// Ruta Detalle de Usuarios
router.get("/:id", isLogged, usersController.detail);

//Ruta Editar de Usuarios
router.get("/edit/:id", usersController.edit);

//Ruta Procesar Edicion
router.put("/:id",
  upload.single("image"),
  validatePerson,
  usersController.update
);

// Ruta para Eliminar usuario
router.get("/delete/:id", [
  isLogged,
  isAdmin
], usersController.delete);

router.delete("/:id", [
  isLogged,
  isAdmin
], usersController.delete);

module.exports = router;
