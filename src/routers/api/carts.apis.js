import { Router } from "express";
import {
    create,
    destroy,
    read,
    readAll,
    update,
  } from "../../controllers/carts.controller.js";

const cartsApiRouter = Router();

cartsApiRouter.post("/", create);
cartsApiRouter.get("/", readAll);
cartsApiRouter.get("/:cid", read);
cartsApiRouter.put("/:cid", update);
cartsApiRouter.delete("/:cid", destroy);

export default cartsApiRouter;
