import express from "express";
import { sendEmailVerification } from "../controllers/authControllers";

const router = express.Router();

router.post("/send-email-verification", sendEmailVerification);

export default router;
