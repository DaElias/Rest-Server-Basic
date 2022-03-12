const { Router } = require("express");
const { loginPost,googleSignIn } = require("../controllers/auth.controller");
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

router.post(
  "/google",
  [
    check("id_token","Token de google no es valido").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);


module.exports = router;
