import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const formValidatorMiddleware = (rules) => {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors.array(),
    });
  };
};

export default formValidatorMiddleware;
