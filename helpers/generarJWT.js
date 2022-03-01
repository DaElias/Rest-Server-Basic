const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    const token = jwt.sign(
      payload,
      process.env.SECRETE_PRIVATE_KEY,
      {
        algorithm: "HS256",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token!");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};

//* old code
 // jwt.sign(
    //   payload,
    //   process.SECRETPRIVATEKEY,
    //   {
    //     expiresIn: "4h",
    //   },
    //   (err, token) => {
    //     if (err) {
    //       console.log(err);
    //       reject("No se pudo generar el token!");
    //     } else {
    //       resolve(token);
    //     }
    //   }
    // );