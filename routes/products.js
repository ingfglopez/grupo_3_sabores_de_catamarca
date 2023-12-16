const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

const path = require("path");
const multer = require("multer");

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

// Create
router.get("/create", productController.create);
router.post("/", upload.single("image"), productController.store);

// Read
router.get("/", productController.products);
router.get("/:id", productController.detail);

// Update
router.get("/:id/edit", productController.update);
router.put("/:id", productController.update);

// Delete
router.get(":id/delete", productController.delete);
router.delete(":id", productController.delete);

module.exports = router;
