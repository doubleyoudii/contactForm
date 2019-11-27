import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate";

const schema = new Schema({
  clientId: {
    type: String
  },
  fullName: {
    required: [true, "Name is required."],
    type: String,
    
  },
  emailAddress: {
    required: true,
    type: String,
  },
  company: {
    required: true,
    type: String
  },
  contactNo: {
    required: true,
    type: Number
  },
  subject: {
    required: true,
    type: String
  },
  promoCode: {
    type: String
  },
  birthday: {
    type: Date
  },
  message: {
    required: true,
    type: String
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

schema.plugin(paginate);

export default model("Form", schema);
