import { body } from "express-validator";

export const orderPaymentIntentForm = [body("orderID").isMongoId()];

export const createOrderForm = [
  body("washTypeID").isMongoId(),
  body("carTypeID").isMongoId(),
  body("addressID").isMongoId(),
];
