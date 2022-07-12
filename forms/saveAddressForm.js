import { body } from "express-validator";

export default [
  body("address.name").isString().trim().isLength({ min: 3 }),
  body("address.address").isString().trim().isLength({ min: 3 }),
  body("address.lat").isNumeric(),
  body("address.lng").isNumeric(),
];
