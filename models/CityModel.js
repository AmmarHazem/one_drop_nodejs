import mongoose from "mongoose";
import { CountryModelSchema } from "./CountryModel";

export const CityModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: CountryModelSchema,
    required: true,
  },
});

export default mongoose.model("City", CityModelSchema);
