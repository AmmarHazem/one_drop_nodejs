import mongoose from "mongoose";
import moment from "moment";

const CouponUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const DiscountCouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      minLength: 6,
      // unique: true,
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
      type: [CouponUserSchema],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

DiscountCouponSchema.index({ code: 1 });

DiscountCouponSchema.virtual("isExpired").get(function () {
  const expiryDate = moment(this.expiryDate);
  return moment().isAfter(expiryDate);
});

export default mongoose.model("DiscountCoupon", DiscountCouponSchema);
