import mongoose from "mongoose";
import moment from "moment";
import { CityModelSchema } from "./CityModel";

const UserModelSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 4,
    },
    otpCreatedAt: {
      type: Date,
    },
    didRegister: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    city: {
      type: CityModelSchema,
    },
    neighborhoodName: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserModelSchema.pre("save", function () {
  if (!this.isModified("otp")) return;
  this.otpCreatedAt = new Date();
});

UserModelSchema.statics.getOrCreate = async function ({
  getQuery = {},
  createData = {},
}) {
  const user = await this.findOne(getQuery);
  if (user) return user;
  return this.create({ ...getQuery, ...createData });
};

UserModelSchema.virtual("isOTPExpired").get(function () {
  if (!this.otpCreatedAt) return true;
  const now = moment();
  const otpExpiryDate = moment(this.otpCreatedAt).add(1, "hours");
  return now.isAfter(otpExpiryDate);
});

export default mongoose.model("User", UserModelSchema);
