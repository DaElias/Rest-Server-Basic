const { response } = require("express");
const Categoria = require("../models/categoria");

//Mensajes
const msgCateNo = "La categoria no esta disponible!!";

const obtenerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [categorias, total] = await Promise.all([
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "name"),
    Categoria.countDocuments(query),
  ]);

  res.json({
    categorias,
    total,
  });
};

const obtenerCategoria = async (req, res) => {
  const _id = req.params.id;
  const getCategoria = await Categoria.findOne({ _id }).populate(
    "usuario",
    "name"
  );
  if (!getCategoria.state) {
    return res.json({ msg: msgCateNo });
  }
  return res.json({ getCategoria });
};

const actualizarCategoria = async (req, res) => {
  // Definir los elementos que se desea modificar
  const name = req.body.name.toUpperCase();
  const { id } = req.params; //id de la categoria

  //* verfica que la categoria no este eliminado
  const _id = id;
  const validarCategoria = await Categoria.findById({ _id });
  if (!validarCategoria.state) {
    return res.json({
      msg: msgCateNo,
    });
  }
  const cambioUsuario = req.uid._id;
  const resto = {
    name,
    usuario: cambioUsuario,
  };
  const uppdate = await Categoria.findByIdAndUpdate(id, resto, {
    new: true,
  }).populate("usuario", "name");
  return res.json({
    categoria: uppdate,
  });
};

const borrarCategoria = async (req, res) => {
  const { id } = req.params;
  console.log(req.uid)
  const eliminarCatego = await Categoria.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  ).populate("usuario","name");

  return res.json({
    categoria: eliminarCatego,
  });
};

const crearCategoriaPost = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoriaDB = await Categoria.findOne({ name });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `categoria existente!!`,
    });
  }
  const data = {
    name,
    usuario: req.uid._id,
    state: true,
  };
  try {
    const categoria = new Categoria(data);
    await categoria.save();
    // console.log(categoria);
    return res.json(categoria);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  actualizarCategoria,
  crearCategoriaPost,
  obtenerCategoria,
  obtenerCategorias,
  borrarCategoria,
};
