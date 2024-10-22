// import { Router } from "express";
// import { loginView, loginUsers, registerView, showOneUser } from "../../controllers/users.controllers.js";
// import usersMongoManager from "../../data/UsersManager.js";

// const usersViewRouter = Router();

// usersViewRouter.get("/register", registerView)
// usersViewRouter.get("/login", loginView);
// usersViewRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await usersMongoManager.readOneUserByEmail(email);

//         if (user && user.password === password) {
//             // Autenticación exitosa
//             res.redirect('/products/admin'); // Redirigir a una página de éxito
//         } else {
//             // Autenticación fallida
//             res.render('login', { error: 'Email o contraseña incorrectos' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.render('login', { error: 'Ocurrió un error, por favor intenta nuevamente' });
//     }
// });




// usersViewRouter.get("/:uid", showOneUser)


// export default usersViewRouter;
