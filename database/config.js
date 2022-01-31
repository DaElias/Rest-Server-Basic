const mongoose = require("mongoose");


const dbConection = async () => {
  try {
    // code here
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log("Base de Datos en linea!!");
  } catch (e) {
    console.log(e);
    throw new Error("Error-Data-Base: " + e);
  }
};

module.exports = {
  dbConection,
};
