require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    //conectar a db
    this.conectDB();
    //middelware
    this.middelware();

    this.routes();
  }

  async conectDB() {
    dbConection();
  }

  middelware() {
    //corse
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }
  //rutas del servidor
  routes() {
    this.app.use(this.usuariosPath, require("../routes/users.router"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servideor Corriendo en http://localhost:${this.port}/`)
    );
  }
}

module.exports = Server;
