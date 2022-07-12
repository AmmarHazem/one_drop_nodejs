import express from "express";
import { getCarTypes, createCarType } from "../controllers/carTypeControllers";

const router = express.Router();

router.post("/", createCarType);
router.get("/", getCarTypes);

export default router;
