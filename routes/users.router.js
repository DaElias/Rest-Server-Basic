const { Router } = require("express");
const {
  getUsuarios,
  postUsuarios,
  putUsuario,
  deleteUsuarios,
  pathUsuarios,
} = require("../controllers/users.controller");
const router = Router();

router.get("/", getUsuarios);

router.post("/", postUsuarios);

router.put("/:usuarioID", putUsuario);

router.delete("/", deleteUsuarios);

router.patch("/", pathUsuarios);

module.exports = router;
