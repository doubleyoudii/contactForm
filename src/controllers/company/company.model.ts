import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate";

const schema = new Schema({
  companyName: {
    required: true,
    type: String
  },
  
});

schema.plugin(paginate);

export default model("Company", schema);
