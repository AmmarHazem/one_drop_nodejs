import mongoose from "mongoose";

export const CarTypeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
  },
  washingDurationInSeconds: {
    type: Number,
    required: true,
    min: 5 * 60,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("CarType", CarTypeSchema);
