import { Router } from "express";
import {
  modifyProduct,
  showOneProduct,
  showProducts,
  showProductsAdmin,
} from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts);

productsViewRouter.get("/admin", showProductsAdmin)
productsViewRouter.get("/:pid", showOneProduct);
productsViewRouter.get("/admin/:pid", modifyProduct);


export default productsViewRouter;
