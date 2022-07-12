import { body } from "express-validator";
import moment from "moment";

export default [
  body("expiryDate").custom((value) => {
    if (!value) return Promise.reject("expiryDate is required");
    const expiryDate = moment(value);
    const now = moment();
    if (now.isAfter(expiryDate)) {
      return Promise.reject("Invalid expiryDate");
    }
    return Promise.resolve();
  }),
  body("discountPercentage")
    .isNumeric()
    .custom((value) => {
      if (value < 0) {
        return Promise.reject("Invalid discountPercentage");
      } else if (value > 100) {
        return Promise.reject("Invalid discountPercentage");
      }
      return Promise.resolve();
    }),
];
