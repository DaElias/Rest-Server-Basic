const { Router } = require("express");
const { loginPost } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida-campos");

const router = Router();

router.post(
  "/login",
  [
    check("mail", "El correo no es valido!!").isEmail(),
    check("password", "Debe escribir una contraseña!!").not().isEmpty(),
    validarCampos,
  ],
  loginPost
);

module.exports = router;
