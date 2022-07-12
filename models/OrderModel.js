import mongoose from "mongoose";
import { CarTypeSchema } from "./CarTypeModel";
import { UserAddressSchema } from "./UserAddressModel";
import { DiscountCouponSchema } from "./DiscountCouponModel";
import { WashTypeSchema } from "./WashTypeModel";

const OrderSchema = new mongoose.Schema(
  {
    washType: {
      type: WashTypeSchema,
      required: true,
    },
    carType: {
      type: CarTypeSchema,
      required: true,
    },
    address: {
      type: UserAddressSchema,
      required: true,
    },
    coupon: {
      type: DiscountCouponSchema,
    },
    status: {
      type: String,
      enum: [
        "PENDING_PAYMENT",
        "CONFIRMED",
        "ON_WAY",
        "IN_PROGRESS",
        "CANCELLED",
        "COMPLETED",
      ],
      default: "PENDING_PAYMENT",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    cancelation: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OrderSchema.virtual("subtotal").get(function () {
  return this.washType.price + this.carType.price;
});

OrderSchema.virtual("total").get(function () {
  const subtotal = this.subtotal;
  if (!this.coupon?.discountPercentage) {
    return subtotal;
  }
  const discountAmount = subtotal * (this.coupon?.discountPercentage / 100);
  return subtotal - discountAmount;
});

OrderSchema.index({ createdBy: 1 });

export default mongoose.model("Order", OrderSchema);
