const { Router } = require("express");
const {
  getUsuarios,
  postUsuarios,
  putUsuario,
  deleteUsuarios,
  pathUsuarios,
} = require("../controllers/users.controller");
const { check } = require("express-validator");

// const { validarCampos } = require("../middlewares/valida-campos");
// const { validarJwt } = require("../middlewares/validar-jwt");
// const {validarRoles,tieneRol} = require("../middlewares/validar-roles")
// * Truco para organizar el codigo!!
const {
  validarCampos,
  validarJwt,
  validarRoles,
  tieneRol,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioId,
} = require("../helpers/db_validator");

//* Routes code here!! */
const router = Router();

router.get("/", getUsuarios);
// check basicamente valida que mail sea un Email
router.post(
  "/",
  [
    check("mail", "El correo no es valido!").isEmail(),
    check("name", "El nombre no puede estar vacio!").not().isEmpty(),
    check("password", "La contraseña debe tener minimo 6 caracteres!").isLength(
      {
        min: 6,
      }
    ),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("mail").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUsuarios
);
router.put(
  "/:id",
  [
    check("id", "no es un Id valido!!").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  putUsuario
);
router.delete(
  "/:id",
  [
    validarJwt,
    // validarRoles,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "no es un Id valido!!").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  deleteUsuarios
);
router.patch("/", pathUsuarios);

module.exports = router;
