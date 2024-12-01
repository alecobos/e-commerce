import { Router } from "express";
import productsMongoManager from "../../data/mongo/managers/product.mongo.js"
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";


const viewRouter = Router();

viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.get("/", async (req, res, next) => {
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

export default viewRouter;



