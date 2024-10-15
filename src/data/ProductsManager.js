import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    // 0. apenas se crea la instancia se tiene que verificar si existe o no existe el archivo
    // si no existe, hay que crearlo con un array vacío
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("file created");
    } else {
      console.log("file already exists");
    }
  }

  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);

      // Si la categoría es "All" o no hay categoría, devolver todos los productos
      if (!category || category === "All") {
        return parseData;
      }

      // Filtrar productos por categoría
      const filteredData = parseData.filter(
        (each) => each.category === category
      );
      return filteredData;
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

      data.price = Number(data.price); // Asegurarse de que sea un número
      data.stock = Number(data.stock); // Asegurarse de que sea un número


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
      const all = await this.readAll();
      const index = all.findIndex((product) => product.id === id);
      if (index === -1) {
        return null;
      }
      all[index] = { ...all[index], ...newData };
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return all[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const all = await this.readAll();
      const filteredProducts = all.filter((product) => product.id !== id);
      if (all.length === filteredProducts.length) {
        return null;
      }
      const stringAll = JSON.stringify(filteredProducts, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return "PRODUCT DELETED";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/files/products.json");
export default productsManager;
