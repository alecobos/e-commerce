import { Router } from "express";
import productsMongoManager from "../../data/mongo/managers/product.mongo.js";
// import {
//   update,
//   read,
//   readAll,
// } from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsMongoManager.readAll();
    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
});


productsViewRouter.get("/admin", async (req, res, next) => {
  try {
    const products = await productsMongoManager.readAll();
    return res.render("productsAdmin", { products });
  } catch (error) {
    return next(error);
  }
});

productsViewRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log("Product ID:", pid);
    const response = await productsMongoManager.read(pid);
    if (response) {
      return res.render("oneproduct", { one: response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

productsViewRouter.get("/admin/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log("Product ID:", pid);
    const response = await productsMongoManager.read(pid);
    if (response) {
      return res.render("modifyProduct", { one: response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default productsViewRouter;
