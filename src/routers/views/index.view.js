import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";
import cartsViewRouter from "./carts.view.js"

const viewRouter = Router();

viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.use("/carts", cartsViewRouter);
viewRouter.get("/", (req, res, next) => {
    try {
        return res.render("index")
    } catch (error) {
        return next (error)
    }
})

export default viewRouter;
