import mongoose from "mongoose";
import moment from "moment";

export const DiscountCouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    minLength: 6,
  },
  expiryDate: {
    type: Date,
    validate: function (value) {
      if (!value) return false;
      const expiryDate = moment(value);
      const now = moment();
      return now.isBefore(expiryDate);
    },
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  usedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  usedDate: {
    type: Date,
  },
});

export default mongoose.model("DiscountCoupon", DiscountCouponSchema);
