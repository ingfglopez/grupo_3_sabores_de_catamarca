const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

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
router.get("/create", productsController.create);
router.post("/", upload.single("image"), productsController.store);

// Read
router.get("/", productsController.products);
router.get("/:id", productsController.detail);

// Update
router.get("/:id/edit", productsController.update);
router.put("/:id", upload.single("image") , productsController.update);

// Delete
router.get("/:id/delete", productsController.delete);
router.delete("/:id", productsController.delete);

module.exports = router;
