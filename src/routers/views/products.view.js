import { Router } from "express";
import {
  showOneProduct,
  showProducts,
  showProductsAdmin,
} from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts);

productsViewRouter.get("/admin", showProductsAdmin)
productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
