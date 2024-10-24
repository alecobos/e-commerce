import productsMongoManager from "../data/mongo/managers/product.mongo.js";
import usersManager from "../data/mongo/managers/user.manager.js";
import cartsMongoManager from "../data/mongo/managers/cart.manager.js";


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
      }
    } catch (error) {
      console.error(error);
      socket.emit("login response", {
        success: false,
        message: error.message,
      });
    }
  });

  //listener para un nuevo carrito
  socket.on("new cart", async (data) => {
    try {
      console.log("entro a index.socket.js");
      const id = await cartsMongoManager.create(data);
      console.log("Carrito creado con ID:", id);
    } catch (error) {
      console.error("Error creando el carrito:", error);
    }
  });

    //listener para el evento "delete carts"
    socket.on("delete cart", async (cid) => {
      console.log("cid: ", cid);
      console.log(await cartsMongoManager.destroy(cid));
    });

  // Listener para el evento "search products" funciona bien sin paginate
  socket.on("search products", async (searchQuery) => {
    //console.log("Query recibido del cliente:", searchQuery); // Verificar el valor recibido

    let filter = {};

    if (searchQuery !== "All") {
      // Si no es "all", aplicamos el filtro por categoría
      filter = { category: { $regex: searchQuery, $options: "i" } };
    }

    const filteredProducts = await productsMongoManager.readAll(filter);
    //console.log("Productos encontrados:", filteredProducts); // Verifica qué productos devuelve la consulta
    socket.emit("filtered products", filteredProducts);
  });
  
  
  // Listener para el evento "search products"

//   socket.on("search products", async (searchQuery, page = 1, limit = 10) => {
//     //console.log("Query recibido del cliente:", searchQuery); // Verificar el valor recibido

//     let filter = {};

//     if (searchQuery !== "All") {
//         // Si no es "all", aplicamos el filtro por categoría
//         filter = { category: { $regex: searchQuery, $options: "i" } };
//     }

//     const opts = {
//         page,
//         limit,
//         lean: true,
//         sort: { createdAt: -1 } // Puedes ajustar el orden según tus necesidades
//     };

//     try {
//         const result = await productsMongoManager.paginate(filter, opts);

//         socket.emit("search results", {
//             products: result.docs,
//             totalPages: result.totalPages,
//             currentPage: result.page
//         });
//     } catch (error) {
//         console.error("Error al buscar productos:", error);
//         socket.emit("search error", "Hubo un error al buscar productos.");
//     }
// });


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
