import express from "express";
import {
  createOrder,
  getOrders,
  createOrderPaymentIntent,
} from "../controllers/orderControllers";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import { createOrderForm, orderPaymentIntentForm } from "../forms/orderForms";
import formValidatorMiddleware from "../middleware/formValidatorMiddleware";

const router = express.Router();

router.post(
  "/create-order-payment-intent",
  [authenticationMiddleware, formValidatorMiddleware(orderPaymentIntentForm)],
  createOrderPaymentIntent
);
router.get("/", [authenticationMiddleware], getOrders);
router.post(
  "/",
  [authenticationMiddleware, formValidatorMiddleware(createOrderForm)],
  createOrder
);

export default router;
