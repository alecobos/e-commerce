import productsManager from "../data/ProductsManager.js";
import usersManager from "../data/UsersManager.js";

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

  // Listener para el evento "search products"
  socket.on("search products", async (searchQuery) => {
    const filteredProducts = await productsManager.readAll(searchQuery);
    socket.emit("filtered products", filteredProducts);
  });

  //listener para el evento "create products"
  socket.on("new product", async (data) => {
    const id = await productsManager.create(data);
    const allProducts = await productsManager.readAll();
    socket.emit("refresh products", allProducts);
  });

  //listener para el evento "delete products"
  socket.on("delete product", async (pid) => {
    console.log(await productsManager.delete(pid));
    const allProducts = await productsManager.readAll();
    socket.emit("refresh products", allProducts);
  });

  //listener para el evento "delete products"
  socket.on("modify product", async (data) => {
    console.log("Received data:", data); // Añade esto para verificar los datos en el servidor

    const { id, ...newData } = data;
    console.log("Modifying product with ID:", id, "and new data:", newData); // Verificar ID y nuevos datos

    const updatedProduct = await productsManager.update(id, newData);
    if (updatedProduct) {
      const allProducts = await productsManager.readAll();
      socket.emit("refresh products", allProducts);
    } else {
      console.log("Product not found or failed to update");
    }
  });

};

export default socketCb;

