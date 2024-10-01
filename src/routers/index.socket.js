import usersManager from "../data/UsersManager.js";

const socketCb = async (socket) => {
  console.log("socket connected id: " + socket.id);
  socket.on("new user", async (data) => {
    const id = await usersManager.create(data);
    const allUsers = await usersManager.readAll();
    socket.emit("update users", allUsers);
  });
  const allUsers = await usersManager.readAll();
  socket.emit("update users", allUsers);
};

export default socketCb;
