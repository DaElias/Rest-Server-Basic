const { Router } = require("express");
const {
  editarProductos,
  elimiarProductos,
  crearProductos,
  obtenerProductos,
  obtenerProducto,
} = require("../controllers/productos.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { tieneRol } = require("../middlewares/validar-roles");
const { existeCategoria, existeProducto } = require("../helpers/db_validator");
const router = Router();

router.get("/", obtenerProductos);

router.delete(
  "/:id",
  [
    validarJwt,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  elimiarProductos
);

router.put(
  "/:id",
  [
    validarJwt,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "El id no es valido").isMongoId(),
    check("name", "el nombre es obligatorio!!").not().isEmpty(),
    // check("categoria","la categoria no existe").custom(existeCategoria),
    check("description", "la description es obligatorio!!").not().isEmpty(),
    validarCampos,
  ],
  editarProductos
);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJwt,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("categoria", "Categoria no valida!!").custom(existeCategoria),
    check("name", "El producto debe tener nombre!!").not().isEmpty(),
    validarCampos,
  ],
  crearProductos
);

module.exports = router;
