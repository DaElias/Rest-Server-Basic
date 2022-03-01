const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJwt = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json({
      msg: "Acceso denegado la petición no esta validada!! ",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETE_PRIVATE_KEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario.state) {
        return res.status(401).json({
          msg:""
        })
      }


    req.uid = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no valido!!",
    });
  }
};

module.exports = { validarJwt };
