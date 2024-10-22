//import productsManager from "../data/ProductsManager.js";
import productsMongoManager from "../data/mongo/managers/product.mongo.js";
import usersManager from "../data/mongo/managers/user.manager.js";

const socketCb = async (socket) => {
  console.log("socket connected id: " + socket.id);

  // Listener para el evento "new user"
  socket.on("new user", async (data) => {
    const id = await usersManager.create(data);
    const allUsers = await usersManager.readAll();
    socket.emit("update users", allUsers);
  });

  // Enviar la lista de usuarios al conectarse
  const allUsers = await usersManager.readAll();
  socket.emit("update users", allUsers);

  // conectar en login
  socket.on("user login", async ({ email, password }) => {
    console.log(`Received email: ${email}, password: ${password}`);
    try {
      const user = await usersManager.findUser(email, password);
      if (!user) {
        socket.emit("login response", {
          success: false,
          message: "Invalid username or password",
        });
      } else {
        socket.userId = user._id;
        socket.emit("login response", {
          success: true,
          user: user,
        });

      //para acceder al usuario conectado, ver donde tiene que ir  
      //   usersViewRouter.get('/dashboard', (req, res) => {
      //     if (!req.session.user) {
      //         return res.redirect('/login');
      //     }
      
      //     // Usa los datos del usuario desde la sesión
      //     res.render('dashboard', {
      //         user: req.session.user,
      //     });
      // });



        //const cart = await cartManager.readCartsByUserId(socket.userId);
        //socket.emit("load cart", cart);
      }
    } catch (error) {
      console.error(error);
      socket.emit("login response", {
        success: false,
        message: error.message,
      });
    }
  });


  

  // Listener para el evento "search products"
  socket.on("search products", async (searchQuery) => {
    console.log("Query recibido del cliente:", searchQuery); // Verificar el valor recibido
  
    let filter = {};
    
    if (searchQuery !== "All") {
      // Si no es "all", aplicamos el filtro por categoría
      filter = { category: { $regex: searchQuery, $options: "i" } };
    }
  
    const filteredProducts = await productsMongoManager.readAll(filter);
    console.log("Productos encontrados:", filteredProducts); // Verifica qué productos devuelve la consulta
    socket.emit("filtered products", filteredProducts);
  });

  //listener para el evento "create products"
  socket.on("new product", async (data) => {
    const id = await productsMongoManager.create(data);
    const allProducts = await productsMongoManager.readAll();
    socket.emit("refresh products", allProducts);
  });

  //listener para el evento "delete products"
  socket.on("delete product", async (pid) => {
    console.log(await productsMongoManager.destroy(pid));
    const allProducts = await productsMongoManager.readAll();
    socket.emit("refresh products", allProducts);
  });

  //listener para el evento "modify products"
  socket.on("modify product", async (data) => {
    console.log("Received data:", data); // Añade esto para verificar los datos en el servidor

    const { id, ...newData } = data;
    console.log("Modifying product with ID:", id, "and new data:", newData); // Verificar ID y nuevos datos

    const updatedProduct = await productsMongoManager.update(id, newData);
    if (updatedProduct) {
      const allProducts = await productsMongoManager.readAll();
      socket.emit("refresh products", allProducts);
    } else {
      console.log("Product not found or failed to update");
    }
  });

};

export default socketCb;

