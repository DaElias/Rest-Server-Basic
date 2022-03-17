const { Router } = require("express");
const { check } = require("express-validator");
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/valida-campos");
const {
  crearCategoriaPost,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias.controller");
const { existeCategoria } = require("../helpers/db_validator");
const {tieneRol} = require("../middlewares/validar-roles")
const router = Router();
// * {{url}}/api/categorias

//todas las categorias
router.get("/", obtenerCategorias);
//obtener categorias especificas
router.get(
  "/:id",
  [
    check("id", "no es un Id valido!!").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  "/",
  [
    validarJwt,
    check("name", "el nombre es obligatorio!!").not().isEmpty(),
    validarCampos,
  ],
  crearCategoriaPost
);
// actualizar categorias
router.put(
  "/:id",
  [
    validarJwt,
    check("name", "el nombre es obligatorio!!").not().isEmpty(),
    check("id", "no es un Id valido!!").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  actualizarCategoria
);
//eliminar categorias
router.delete(
  "/:id",
  [validarJwt,tieneRol("ADMIN_ROLE", "VENTAS_ROLE"), check("id", "no es un Id valido!!").isMongoId(), validarCampos],
  borrarCategoria
);

module.exports = router;
