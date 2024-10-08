import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";
import cartsViewRouter from "./carts.view.js"
import chatViewRouter from "./chat.view.js";

const viewRouter = Router();

viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.use("/chat", chatViewRouter);
viewRouter.use("/carts", cartsViewRouter);

viewRouter.use("/", productsViewRouter); //probando esto
viewRouter.get("/", (req, res, next) => {
    try {
        return res.render("index")
    } catch (error) {
        return next (error)
    }
})

export default viewRouter;
