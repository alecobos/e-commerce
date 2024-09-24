import express, { response } from "express";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("server ready on port " + port);
  server.listen(port, ready);

  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use("/public", express.static("public"))

  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");

  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (error) {
  console.log(error);
}
