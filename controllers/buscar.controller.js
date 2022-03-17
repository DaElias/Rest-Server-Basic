const { response } = require("express");

const buscar = async (req, res = response) => {
  const { coleccion, termino } = req.params;

  return res.json({coleccion, termino });
};

module.exports = { buscar };
