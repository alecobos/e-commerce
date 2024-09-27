import { Router } from "express";

const chatViewRouter = Router();
chatViewRouter.get("/", (req, res, next) => {
    try {
        res.render("chat")
    } catch (error) {
        return next(error)
    }
})

export default chatViewRouter;
