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
  },
  { timestamps: true }
);

EmailVerificationCodeSchema.virtual("isValid").get(function () {
  const now = moment();
  const createdAt = moment(this.createdAt);
  return now.isBefore(createdAt.add());
});

export default mongoose.model(
  "EmailVerificationCode",
  EmailVerificationCodeSchema
);
