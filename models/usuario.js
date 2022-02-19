const { Schema, model } = require("mongoose");

const UsersSchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  mail: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    // emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// aqui podemos sobre escribir metodos
UsersSchema.methods.toJSON = function () {
  // lo que hace esta funcion es eliminar el pasword encriptado del req
  const { __V, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("User", UsersSchema);
