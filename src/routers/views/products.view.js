import { Router } from "express";
import { showProducts } from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts)

export default productsViewRouter;
