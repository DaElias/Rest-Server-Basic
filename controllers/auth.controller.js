const { response, request } = require("express");
const User = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google_verify");

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

    return res.json({
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);
    const mail = email;
    let usuario = await User.findOne({ mail });
    if (!usuario) {
      //crear usuario
      const data = {
        name,
        mail: email,
        password: ":D",
        img: picture,
        google: true,
        rol: "USER_ROLE",
      };
      usuario = new User(data);
      await usuario.save();
    }
    //si el usuario de Db esta falso
    if (!usuario.state) {
      return res.status(401).json({
        mgs: "El usuario no esta disponible!!",
      });
    }
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    // console.log("Error: ", error);
    res.json({
      error,
      msg: "Token invalido!!",
    });
  }
};

module.exports = { loginPost, googleSignIn };

/*
//* example
const exampleName = async (req=response, res=request) => {
    //code here
};
*/
