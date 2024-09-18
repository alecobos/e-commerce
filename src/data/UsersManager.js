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
  async readAll(rol) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      //console.log(parseData);
      if (rol) {
        const filteredData = parseData.filter(
          (each) => each.rol === rol
        );
        return filteredData;
      } else {
        return parseData;
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
  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
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
  
  // async update(id, newData) {
  //   try {
  //     const all = await this.readAll();
  //     const index = all.findIndex((user) => user.id === id);
  //     if (index === -1) {
  //       return null;
  //     }
  //     all[index] = { ...all[index], ...newData };
  //     const stringAll = JSON.stringify(all, null, 2);
  //     await fs.promises.writeFile(this.path, stringAll);
  //     return all[index];
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  async delete(id) {
    try {
      const all = await this.readAll();
      const filteredUsers = all.filter((user) => user.id !== id);
      if (all.length === filteredUsers.length) {
        return null
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
