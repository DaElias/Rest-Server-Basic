const { Schema, model } = require("mongoose");

const productoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  description: {
    type: String,
  },
  disponible: { type: Boolean, default: true },
});

productoSchema.methods.toJSON = function () {
  const { __v, state, ...producto } = this.toObject();
  return producto;
};

module.exports = model("Producto", productoSchema);
