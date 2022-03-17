const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio!"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    require: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});
//usamos esto para ocultar elementos a la hora se hacer las peticiones al servidor!!
categoriaSchema.methods.toJSON = function () {
  const { __v, state, ...categoria } = this.toObject();
  return categoria;
};

module.exports = model("Categoria", categoriaSchema);
