import express from "express";
import {
  saveAddress,
  getCurrentUser,
  deleteAddress,
} from "../controllers/userControllers";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import formValidatorMiddleware from "../middleware/formValidatorMiddleware";
import saveAddressForm from "../forms/saveAddressForm";

const router = express.Router();

router.get("/get-current-user", [authenticationMiddleware], getCurrentUser);
router.delete(
  "/delete-address/:addressID",
  [authenticationMiddleware],
  deleteAddress
);
router.post(
  "/save-address",
  [authenticationMiddleware, formValidatorMiddleware(saveAddressForm)],
  saveAddress
);

export default router;
