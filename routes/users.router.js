const { Router } = require("express");
const {
  getUsuarios,
  postUsuarios,
  putUsuario,
  deleteUsuarios,
  pathUsuarios,
} = require("../controllers/users.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida-campos");
const router = Router();
const Rol = require("../models/rol");
const { esRolValido, emailExiste } = require("../helpers/db_validator");

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

router.put("/:id", putUsuario);

router.delete("/", deleteUsuarios);

router.patch("/", pathUsuarios);

module.exports = router;
