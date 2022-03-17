const { Router } = require("express");
const { buscar } = require("../controllers/buscar.controller");
const { validarCampos, validarJwt } = require("../middlewares");

const router = Router();

router.get("/:coleccion/:termino", [validarJwt, validarCampos], buscar);



module.exports = router;