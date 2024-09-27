import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} from "../../controllers/users.controllers.js";

const usersApiRouter = Router();

usersApiRouter.get("/", getAllUsers);
usersApiRouter.get("/:uid", getUser);
usersApiRouter.post("/", isValidUser, createUser);
usersApiRouter.put("/:uid", updateUser);
usersApiRouter.delete("/:uid", destroyUser);

export default usersApiRouter;
