import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true, index: true },
  photo: {
    type: String,
    default: "https://www.goodram.com/wp-content/uploads/0-998x960.png",
  },
  category: { type: String, default: "Other", index: true },
  price: { type: Number, default: 1, min: 0, max: 1000 },
  stock: { type: Number, default: 1, min: 0 },

});

schema.plugin(mongoosePaginator);
// le indico al schema que tiene habilitado ademas de todos los metodos de mongoose
// el método paginate() para poder paginar los documentos de la coleccion
// MINIMO PAGINAR PRODUCTOS
const Product = model(collection, schema);
export default Product;
