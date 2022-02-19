const Rol = require("../models/rol");
const User = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol)
    throw new Error(`El rol no esta registrado en la Base de datos ${rol}!`);
};

const emailExiste = async (mail = "") => {
  // es importante pasar como parametro mail para que pueda 
  // realizar la busqueda en verificarMail
  const verificarMail = await User.findOne({ mail });
  // verificar si el correo existe, si existe manda un error
  if (verificarMail) {
    throw new Error(`El correo electronico: ya esta registrado`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
};
