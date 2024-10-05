import { Router } from "express";
import { registerView, showOneUser } from "../../controllers/users.controllers.js";

const usersViewRouter = Router();

usersViewRouter.get("/register", registerView)
usersViewRouter.get("/:uid", showOneUser)

export default usersViewRouter;
