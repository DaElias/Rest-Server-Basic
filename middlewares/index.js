const validarCampos = require("./valida-campos");
const validarJwt = require("./validar-jwt");
const validarRoles = require("./validar-roles");


module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRoles
}