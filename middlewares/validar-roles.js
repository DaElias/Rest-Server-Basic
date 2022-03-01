const { response } = require("express");

const validarRoles = (req, res = response, next) => {
  
    console.log(req.uid)
    next();
};

module.exports = { validarRoles };
