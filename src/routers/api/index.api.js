import { Router } from "express";
import productsRouter from "./products.api.js";
import usersApiRouter from "./users.api.js";
import cartsApiRouter from "./carts.apis.js"

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersApiRouter);
apiRouter.use("/carts", cartsApiRouter)

export default apiRouter;
