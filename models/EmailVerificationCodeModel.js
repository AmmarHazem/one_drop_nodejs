import mongoose from "mongoose";
import moment from "moment";

const EmailVerificationCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

EmailVerificationCodeSchema.virtual("isExpired").get(function () {
  const now = moment();
  const createdAt = moment(this.createdAt);
  const expiryDate = createdAt.clone().add(1, "hours");
  return now.isAfter(expiryDate);
});

export default mongoose.model(
  "EmailVerificationCode",
  EmailVerificationCodeSchema
);
