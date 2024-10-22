import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "users";
const schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/474x/5a/1b/1e/5a1b1e32639c6210416804dc7a93ef8e.jpg",
  },
  role: { type: String, enum: [0,1,2], default: 0, index: true},
});

schema.plugin(mongoosePaginator)
const User = model(collection, schema);
export default User;