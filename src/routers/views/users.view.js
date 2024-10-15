import { Router } from "express";
import { loginView, loginUsers, registerView, showOneUser } from "../../controllers/users.controllers.js";

const usersViewRouter = Router();

usersViewRouter.get("/register", registerView)
usersViewRouter.get("/login", loginView);
usersViewRouter.post("/login", loginUsers);
usersViewRouter.get("/:uid", showOneUser)


export default usersViewRouter;
