import User from "../models/user.model.js";
//import MongoManager from "./manager.mongo.js";
import mongoose from "mongoose";

class UsersManager {

    constructor() { }

    create = async (data) => {
        try {
          const one = await User.create(data);
          return one;
        } catch (error) {
          throw error;
        }
      };

    async readAll(role) {
        try {
            const query = role ? { role } : {}; 
            const users = await User.find(query);
            return users;
        } catch (error) {
            throw new Error("Error fetching users");
        }
    }

    async readById(uid) {
        try {
            if (!mongoose.Types.ObjectId.isValid(uid)) {
                throw new Error("Invalid User ID");
            }
            const user = await User.findById(uid);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    update = async (id, data) => {
        try {
          const opts = { new: true };
          const one = await User.findOneAndUpdate({ _id: id }, data, opts);
          return one;
        } catch (error) {
          throw error;
        }
      };

    destroy = async (id) => {
        try {
          const one = await User.findOneAndDelete({ _id: id });
          return one;
        } catch (error) {
          throw error;
        }
    };

    async findUser(email, password) {
        try {
            const user = await User.findOne({ email, password });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

}

const usersMongoManager = new UsersManager();
export default usersMongoManager;