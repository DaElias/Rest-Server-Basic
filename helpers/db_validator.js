const Rol = require("../models/rol");
const User = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
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
const existeUsuarioId = async (id = "") => {
  const existeUsuario = await User.findById(id);
  // si existeUsuario es null entonces es falso, el id usuario buscado no existe!!
  if (!existeUsuario) {
    throw new Error(`El id: (${id}) no existe!! `);
  }
};
const existeCategoria = async (id = "") => {
  const _id = id;
  const existeCategoria = await Categoria.findById(_id);

  if (!existeCategoria) {
    throw new Error(`La categoria con el id: ${_id} no existe!!`);
  }
};

const existeProducto = async (id = "") => {
  const _id = id;
  const existeProducto = await Producto.findById(_id);
  if (!existeProducto) {
    throw new Error(`El producto con el id: ${_id} no existe!!`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioId,
  existeCategoria,
  existeProducto,
};
