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
const Rol = require("../models/role");

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
    check("rol").custom(async (rol = "") => {
      const existeRol = await Rol.findOne({ rol });
      if (!existeRol)
         throw new Error(
          `El rol no esta registrado en la Base de datos ${rol}!`
        );
    }),
    validarCampos,
  ],
  postUsuarios
);

router.put("/:usuarioID", putUsuario);

router.delete("/", deleteUsuarios);

router.patch("/", pathUsuarios);

module.exports = router;
