import mongoose from "mongoose";

export const WashTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 10,
  },
});

export default mongoose.model("WashType", WashTypeSchema);
