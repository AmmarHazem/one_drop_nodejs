import express from "express";
import {
  sendEmailOTP,
  otpSignIn,
  signUp,
  logout,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/logout", logout);
router.post("/sign-up", signUp);
router.post("/otp-sign-in", otpSignIn);
router.post("/send-email-otp", sendEmailOTP);

export default router;
