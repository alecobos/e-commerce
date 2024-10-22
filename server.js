import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/routers/index.socket.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbConnect.utils.js";
import session from 'express-session';


try {
  //definimos el servidor http
  const server = express();
  const port = process.env.PORT || 8080;
  const ready = () => {
    console.log("server ready on port " + port);
    dbConnect()
  };

  const httpServer = createServer(server);

  //definimos el servidor tcp
  const socketServer = new Server(httpServer);
  socketServer.on("connection", socketCb);
  httpServer.listen(port, ready);
  
  //template engine
  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");

  //middlewares
  server.use(express.urlencoded({ extended: true })); //para manejar query y params
  server.use(morgan("dev")); // para registrar las solicitudes
  server.use(express.json()); // para trabajar rec.body
  server.use(cors());
  server.use("/public", express.static("public")); //para poder usar la carpeta public
  
  //sessions
  server.use(session({
    secret: 'tu_secreto',  // Cambia esto por una clave secreta
    resave: false,         // No guarda la sesión en cada petición si no ha habido cambios
    saveUninitialized: true, // Guarda una sesión nueva aunque no haya datos
    cookie: { secure: true } // Usa true si el sitio está sobre HTTPS
  }));

  //routers
  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);

} catch (error) {
  console.log(error);
}
