const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

//Rutas
//Listado de todos los useres
router.get("/", usersAPIController.list);
//Detalle del user
router.get("/:id", usersAPIController.detail);

module.exports = router;
