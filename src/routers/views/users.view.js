import { Router } from "express";
import usersMongoManager from "../../data/mongo/managers/user.manager.js";
import cartsMongoManager from "../../data/mongo/managers/cart.manager.js";


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
// Funciona bien sin cart!!!!
// usersViewRouter.get("/profile", async (req, res, next) => {
//     try {
//         // Verifica si hay un usuario en la sesión
//         if (!req.session.user) {
//             return res.status(401).redirect('/users/login');  // Redirige al login si no hay usuario en sesión
//         }
//         const carts = await cartsMongoManager.readAll();
//         // Pasar los datos del usuario almacenados en la sesión a la vista
//         const user = req.session.user;
//         return res.render("oneuser", 
//             { one: user }
//         );
//     } catch (error) {
//         return next(error);
//     }
// });

usersViewRouter.get("/profile", async (req, res, next) => {
    try {
        // Verifica si hay un usuario en la sesión
        if (!req.session.user) {
            return res.status(401).redirect('/users/login');  // Redirige al login si no hay usuario en sesión
        }
        //const carts = await cartsMongoManager.readAll();
        const user = req.session.user;
        console.log("User ID:", user.id); // Verifica el user_id
        const carts = await cartsMongoManager.readAll({ user_id: user.id });
        console.log(carts);
        
        // Pasar los datos del usuario y los carts a la vista
        return res.render("oneuser", 
            { one: user, carts: carts },
        );
    } catch (error) {
        return next(error);
    }
});

usersViewRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await usersMongoManager.findUserByEmail(email);
        if (!user) {
            return res.status(400).render('login', { error: 'User not found' });
        }

        // Comparar la contraseña (sin cifrado, ya que estás en pruebas)
        if (password !== user.password) {
            return res.status(400).render('login', { error: 'Wrong password' });
        }

        // Almacenar la información del usuario en la sesión (incluyendo avatar y password)
        req.session.user = {
            id: user._id,
            email: user.email,
            avatar: user.avatar,  // Asumiendo que 'avatar' existe en el modelo del usuario
            password: user.password,  // Solo para pruebas, no es recomendado almacenar la contraseña en la sesión
            role: user.role
        };

        req.session.save((err) => {
            if (err) {
                console.error("Error al guardar la sesión:", err);
                return res.status(500).render('login', { error: 'Error al guardar la sesión' });
            }

            res.redirect('/users/profile');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});



export default usersViewRouter;