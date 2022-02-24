const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
// const { validationResult } = require("express-validator");

//  {{url}}/api/usuarios?limite=2&desde=9
const getUsuarios = async (req = request, res = response) => {
  // const { query, nombre, apikey } = req;
  const { limite = 6, desde = 0 } = req.query;
  const query = {state:true};
  // Puedo mandar condiciones a la hora llamar los usuarios Usuarios.find({paramatro:true||false})
  
  // const usuarios = await Usuario.find(query)  /* aqui le estoy diciendo llama a todos los state: true */
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query); /* de igual sucede aqui */

const [usuario , total] = await Promise.all([
  Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite)),
    Usuario.countDocuments(query)
]);

  res.json({
    total,
    usuario,
  });
};

const postUsuarios = async (req, res = response) => {
  const { _id, name, mail, password, rol } = req.body;
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
    usuario,
  });
};

// con put puedes pandar parametros por el url y modificar mis datos dentro de la db
const putUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, mail, google, ...resto } = req.body;

  // TODO validar base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    usuario,
  });
};

const deleteUsuarios = async (req, res = response) => {
  const {id} = req.params;

  // #Para eliminar el usuario 
  // const usuario = await Usuario.findByIdAndDelete(id);
  // modificamos el usurio con id.
  const usuario = await Usuario.findByIdAndUpdate(id,{state:false});

  res.json(usuario);
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

/*
## apuntes

put => editar usuarios de la base de datos 
post=> crear usuarios de la base de datos
get => solicitar usuarios de la db
delete => eliminar usuarios de la db


*/


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
