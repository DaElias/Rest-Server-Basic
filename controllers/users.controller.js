const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
// const { validationResult } = require("express-validator");

const getUsuarios = (req = request, res = response) => {
  const { query, nombre, apikey } = req;
  res.json({
    msg: "get Page - Controlador",
    query,
  });
};

const postUsuarios = async (req, res = response) => {
  const { name, mail, password, rol } = req.body;
  const usuario = new Usuario({ name, mail, password, rol });

  // // verificar si el correo existe
  // const verificarMail = await Users.findOne({ mail });
  // if (verificarMail) {
  //   return res.status(400).json({
  //     msg: "Error: El correo ya esta registrado.",
  //   });
  // }
  // encripta la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.json({
    msg: "post Page - Controller",
    usuario,
  });
};

// con put puedes pandar parametros por el url
const putUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { password, mail,google, ...resto } = req.body;

  // TODO validar base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "put Page - Controller",
    id
  });
};

const deleteUsuarios = (req, res = response) => {
  res.json({
    msg: "delete Page - Controller",
  });
};

const pathUsuarios = (req, res = response) => {
  res.json({
    msg: "path Page - Controller",
  });
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuario,
  deleteUsuarios,
  pathUsuarios,
};

// const postUsuarios = async (req, res = response) => {
//   const { name, mail, password, rol } = req.body;
//   const usuario = new Users({ name, mail, password, rol });
//   // valida que el correo sea efectivamente un correo
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res.status(400).json(error);
//   }
//   // verificar si el correo existe
//   const verificarMail = await Users.findOne({ mail });
//   if (verificarMail) {
//     return res.status(400).json({
//       msg: "Error: El correo ya esta registrado.",
//     });
//   }
//   // verificar contraseña
//   const salt = bcryptjs.genSaltSync();
//   usuario.password = bcryptjs.hashSync(password, salt);
//   await usuario.save();
//   res.json({
//     msg: "post Page - Controller",
//     usuario,
//   });
// };
