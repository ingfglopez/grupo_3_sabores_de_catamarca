const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

//Rutas
//Listado de todos los useres
router.get("/", productsAPIController.list);
//Detalle del user
router.get("/:id", productsAPIController.detail);

module.exports = router;
