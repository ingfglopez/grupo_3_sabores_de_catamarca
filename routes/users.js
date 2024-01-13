const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const path = require("path");
const multer = require("multer");

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

//Acceder al Formulario de registro
router.get("/register", usersController.register);

//Procesar Formulario
router.post("/", upload.single("image"), usersController.process);

module.exports = router;
