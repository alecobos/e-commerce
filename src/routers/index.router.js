import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewRouter);
router.use("/", index);


function index(req, res) { 
    try {
        const port = 8000;
        return res.status(200).json({ mensaje: `Welcome Coders!!! The server is ready on port ${port}` });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error" });
    }
}

export default router;