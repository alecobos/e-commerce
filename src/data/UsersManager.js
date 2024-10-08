import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("file created");
    } else {
      console.log("file already exists");
    }
  }

  async readAll(role) {
    try {
      const users = await fs.promises.readFile(this.path, "utf-8");
      const parseUsers = JSON.parse(users);
      if (role) {
        const filteredUsers = parseUsers.filter((user) => user.role === role);
        return filteredUsers;
      } else {
        return parseUsers;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async read(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async readOneUserByEmail(email) {
    try {
      const allUsers = await this.readAllUsers();
      const oneUser = allUsers.find((user) => user.email === email);
      return oneUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      data.isActive = true;
      const all = await this.readAll();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      // Leer todos los usuarios
      const allUsers = await this.readAll();

      // Buscar el índice del usuario que deseas actualizar
      const index = allUsers.findIndex((user) => user.id === id);

      if (index === -1) {
        throw new Error(`User with id ${id} not found`);
      }

      // Actualizar los datos del usuario con los nuevos datos
      allUsers[index] = { ...allUsers[index], ...newData };

      // Guardar los datos actualizados en el archivo
      const updatedData = JSON.stringify(allUsers, null, 2);
      await fs.promises.writeFile(this.path, updatedData);

      return allUsers[index]; // Retorna el usuario actualizado
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const all = await this.readAll();
      const filteredUsers = all.filter((user) => user.id !== id);
      if (all.length === filteredUsers.length) {
        return null;
      }
      const stringAll = JSON.stringify(filteredUsers, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return "user deleted";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;
