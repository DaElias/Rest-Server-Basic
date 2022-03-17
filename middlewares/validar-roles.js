const { response } = require("express");

const validarRoles = (req, res = response, next) => {
  const { rol, name } = req.uid;

  if (!rol) {
    return res.status(500).json({
      msg: "El error al validar el Rol!!!",
    });
  }

  if (rol !== "ADMIN_ROLE") {
    res.status(401).json({
      msg: ` ${name} no tiene los permisos necesarios!! `,
    });
  } else {
    next();
  }
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    const { rol } = req.uid;
    if (!rol) {
      return res.status(500).json({
        msg: "El error al validar el Rol!!!",
      });
    }
    if (!roles.includes(rol)) {
      return res.status(401).json({
          msg:"No tiene los permisos necesarios!!"
      });
    }
    next();
  };
};

module.exports = { validarRoles, tieneRol };
