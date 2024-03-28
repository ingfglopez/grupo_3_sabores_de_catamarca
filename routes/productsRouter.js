const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const validateProduct = require('../middlewares/validateProduct')

const path = require("path");
const multer = require("multer");
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "public/images";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const imageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

router.get("/", [
  isLogged,
  isAdmin
], productsController.list)

// Create
router.get("/create", [
  isLogged,
  isAdmin
], productsController.create);

// Insert
router.post("/", [
  isLogged,
  isAdmin,
  upload.single("image"),
  validateProduct
], productsController.store);

// Detail
router.get("/:id", productsController.detail);

// Update
router.get("/:id/edit", [
  isLogged,
  isAdmin
], productsController.update);

// Put
router.put("/:id", [
  isLogged,
  isAdmin,
  upload.single("image"),
  validateProduct
] , productsController.update);

// Delete
router.get("/:id/delete", [
  isLogged,
  isAdmin
], productsController.delete);

router.delete("/:id", [
  isLogged,
  isAdmin  
], productsController.delete);

module.exports = router;
