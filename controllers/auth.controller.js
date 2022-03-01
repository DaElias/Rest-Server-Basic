const { response, request } = require("express");
const User = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");



const loginPost = async (req = response, res = request) => {
  const { mail, password } = req.body;
  try {
    //* verificar correo
    const usuario = await User.findOne({ mail });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - correo",
      });
    }
    //* verificando estado
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - estado: false",
      });
    }
    //* validar password
    const validarPassword = bcryptjs.compare(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - password",
      });
    }

    //* genera JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado, por favor hablar con el soporte tecnico.",
    });
  }
};

module.exports = { loginPost };

/*
//* example
const exampleName = async (req=response, res=request) => {
    //code here
};
*/
