import { Router } from "express";
import productsMongoManager from "../../data/mongo/managers/product.mongo.js";

const productsViewRouter = Router();

// productsViewRouter.get("/", async (req, res, next) => {
//   try {
//     const products = await productsMongoManager.readAll();
//     return res.render("products", { products });
//   } catch (error) {
//     return next(error);
//   }
// });

productsViewRouter.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      lean: true,
    };
    const products = await productsMongoManager.paginate({}, options);
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

    const response = await productsMongoManager.read(pid);
    if (response) {
      const user = req.session.user;
      return res.render("oneproduct", { 
        one: response,   
        user: user       
      });
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
