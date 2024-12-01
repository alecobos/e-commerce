import { Router } from "express";
import isValidData from "../../middlewares/isValidData.mid.js";
import {
  create,
  destroy,
  readAll,
  paginate,
  read,
  update,
} from "../../controllers/products.controller.js";

const productsApiRouter = Router();

// productsRouter.get("/", readAll);
// productsRouter.get("/:pid", read);
// productsRouter.post("/", isValidData, create);
// productsRouter.put("/:pid", update);
// productsRouter.delete("/:pid", destroy);

productsApiRouter.post("/", create);
productsApiRouter.get("/", readAll);
productsApiRouter.get("/paginate", paginate);
// DECIDIR SI USAMOS READALL O PAGINATE
productsApiRouter.get("/:pid", read);
productsApiRouter.put("/:pid", update);
productsApiRouter.delete("/:pid", destroy);


export default productsApiRouter;
