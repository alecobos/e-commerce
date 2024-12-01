import cart from "../models/cart.model.js";
import MongoManager from "./manager.mongo.js";

const cartsMongoManager = new MongoManager(cart);
export default cartsMongoManager;