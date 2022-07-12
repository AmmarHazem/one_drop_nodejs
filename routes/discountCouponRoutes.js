import express from "express";
import {
  getDiscountCoupons,
  createDiscountCoupon,
} from "../controllers/discountCouponControllers";
import formValidatorMiddleware from "../middleware/formValidatorMiddleware";
import createDiscountCouponForm from "../forms/createDiscountCouponForm";

const router = express.Router();

router.post(
  "/",
  [formValidatorMiddleware(createDiscountCouponForm)],
  createDiscountCoupon
);
router.get("/", getDiscountCoupons);

export default router;
