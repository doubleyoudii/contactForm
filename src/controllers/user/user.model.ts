import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate";

const schema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String
  }
});

schema.plugin(paginate);

export default model("Admin", schema);
