const { response } = require("express");
const Producto = require("../models/producto");
const usuario = require("../models/usuario");

const editarProductos = async (req, res = response) => {
  const { name, price = 0, description } = req.body;
  const _id = req.params.id;

  const validarProducto = await Producto.findById({ _id });

  if (!validarProducto.state) {
    return res.json({ msg: "El producto fue eliminado!!" });
  }

  const data = {
    name,
    price,
    description,
    usuario: req.uid._id,
  };

  const uppdate = await Producto.findByIdAndUpdate(_id, data, {
    new: true,
  }).populate("usuario", "name");
  return res.json({ producto: uppdate });
};
const elimiarProductos = async (req, res = response) => {
  const _id = req.params.id;
  const eliminarP = await Producto.findByIdAndUpdate(
    _id,
    { state: false },
    { new:true }
  ).populate("usuario", "name");
  return res.json({ producto: eliminarP });
};

const crearProductos = async (req, res = response) => {
  const { name, price = 0, description, categoria } = req.body;
  const usuario = req.uid._id;

  //validar nombre del producto
  const existeProducto = await Producto.findOne({ name });
  if (existeProducto) {
    return res.json({ msg: "El producto ya existe!!" });
  }

  const data = {
    name,
    price,
    state: true,
    description,
    categoria,
    usuario,
    disponible: true,
  };
  try {
    const producto = new Producto(data);
    await producto.save();
    return res.json({ producto });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  //crear producto
};
const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [produtos, total] = await Promise.all([
    Producto.find(query).skip(Number(desde)).limit(Number(limite)),
    Producto.countDocuments(query),
  ]);

  return res.json({
    produtos,
    total,
  });
};
const obtenerProducto = async (req, res = response) => {
  const _id = req.params.id;

  const producto = await Producto.findById({ _id }).populate("usuario", "name");

    if (!producto.state) {
        return res.json({msg : "El producto fue eliminado"})
    }

  return res.json({
    producto,
  });
};

module.exports = {
  editarProductos,
  elimiarProductos,
  crearProductos,
  obtenerProductos,
  obtenerProducto,
};
