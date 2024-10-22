import { Router } from "express";
import usersMongoManager from "../../data/mongo/managers/user.manager.js";
//nuevo
import bcrypt from 'bcryptjs';


const usersViewRouter = Router();

usersViewRouter.get("/register", async (req, res, next) => {
    try {
      const users = await usersMongoManager.readAll();
      return res.render("register", { users });
    } catch (error) {
      return next(error);
    }
  });
  
usersViewRouter.get("/login", async (req, res, next) => {
    try {
        const users = await usersMongoManager.readAll();
        return res.render("login", { users });
    } catch (error) {
        return next(error);
    }
});


//nuevo
usersViewRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await usersMongoManager.findUserByEmail(email);
        if (!user) {
            return res.status(400).render('login', { error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña (sin cifrado, ya que estás en pruebas)
        if (password !== user.password) {
            return res.status(400).render('login', { error: 'Contraseña incorrecta' });
        }

        // Almacenar la información del usuario en la sesión
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role,  // Puedes agregar más campos si lo deseas
        };

        // Redirigir a la página de éxito
        res.redirect('/products/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});


export default usersViewRouter;