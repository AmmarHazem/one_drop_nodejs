import mongoose from "mongoose";

export const CountryModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Country", CountryModelSchema);
