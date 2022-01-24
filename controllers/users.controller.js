const { response,request } = require("express");

const getUsuarios = (req =  request, res = response) => {
    const {query, nombre, apikey} = req;


  res.json({
    msg: "get Page - Controlador",
    query
  });
};

const postUsuarios = (req, res = response) => {
  const {name, lastname} = req.body;

  res.json({
    msg: "post Page - Controller",
    data:{
        name,
        lastname
    }
  });
};


// con put puedes pandar parametros por el url
const putUsuario = (req, res = response) => {
    const id = req.params.usuarioID;
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
