const { validationResult } = require("express-validator");



const validarCampos = (req , res , next) => {
  // valida que los campos esten correctos 
  const error = validationResult(req);
  if (!error.isEmpty()) {//si esta vacio continua
    return res.status(400).json(error);
  }
  next();
};


module.exports = {validarCampos};