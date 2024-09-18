// para crear y configurar los enrutadores principalesd de la aplicación de back
// el más importante es el de la api (todos los enrutadores de los recursos, para gestión de los recursos)
// otro que suele estar aquí es el enrutador de vistas

import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewRouter);

export default router;

// function index(req, res) {
//   try {
//     return res.status(200).json({
//       message: "CODER COMMERCE API",
//     });
//   } catch (error) {
//     const { statusCode, message } = error;
//     return res
//       .status(error.statusCode || 500)
//       .json({ message: message || "FATAL ERROR" });
//   }
// }
