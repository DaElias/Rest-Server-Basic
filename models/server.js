require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //rutas del servidor!!
    this.paths = {
      authPath: "/api/auth",
      categoriasPath: "/api/categorias",
      usuariosPath: "/api/usuarios",
      productosPath: "/api/productos",
      buscarPath: "/api/buscar",

    };
    // this.authPath = "/api/auth";
    // this.usuariosPath = "/api/usuarios";
    // this.categoriasPath = "/api/categorias";

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

    //* directorio publico
    this.app.use(express.static("public"));
  }
  //rutas del servidor
  routes() {
    //* this is the route of authentication
    this.app.use(this.paths.authPath, require("../routes/auth.router"));
    this.app.use(this.paths.buscarPath, require("../routes/buscar.router"));
    this.app.use(this.paths.categoriasPath, require("../routes/categorias.router"));
    this.app.use(this.paths.usuariosPath, require("../routes/users.router"));
    this.app.use(this.paths.productosPath, require("../routes/productos.router"));

  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servideor Corriendo en http://localhost:${this.port}/`)
    );
  }
}

module.exports = Server;
