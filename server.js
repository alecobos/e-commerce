import express, { response } from "express";
import productsManager from "./src/data/ProductsManajer.js";

const server = express();
const port = 8000;
const ready = () => console.log("server ready on port " + port);

//obligo al sercidor a usar la funcionalidad urlencoder de express
//para habilitar la lectura de datos complejos en la url (parametros y consultas)
server.use(express.urlencoded({ extended: true }));

server.listen(port, ready);

server.get("/", index);
server.get("/api/products", getAllProducts);
server.get("/api/products/:title/:price/:quantity", create);
server.get("/api/products/:pid", getProduct);
//server.post()
//server.put()
//server.delete()

function index(req, res) {
  try {
    return res.status(200).json({
      message: "CODER COMMERCE API",
    });
  } catch (error) {
    const { statusCode, message } = error;
    return res
      .status(error.statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}

async function getAllProducts(req, res) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "PRODUCTS READ", response });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    const { statusCode, message } = error;
    return res
      .status(statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}

async function create(req, res) {
  try {
    const { title, price, quantity } = req.params; //obligatorio
    let { category, supplier } = req.query; //opcional
    if (!category) {
      category = "none";
    }
    if (!supplier) {
      supplier = "none";
    }
    const response = await productsManager.create({
      title,
      price,
      quantity,
      category,
      supplier,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    const { statusCode, message } = error;
    return response
      .status(statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}

async function getProduct(req, res) {
  //res es el objeto de respuesta a enviar al cliente
  try {
    const { pid } = req.params
    const response = await productsManager.read(pid)
    //response es la respuesta que se espera del manager (para leer un producto)
    if (response) {
      return res.status(200).json ({ message: "PRODUCT READ", response})
    } else {
      const error = new Error("NOT FOUND PRODUCT")
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    const { statusCode, message } = error;
    return res
      .status(statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}
