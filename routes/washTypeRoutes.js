import express from "express";
import {
  getWashTypes,
  createWashType,
} from "../controllers/washTypeControllers";

const router = express.Router();

router.post("/", createWashType);
router.get("/", getWashTypes);

export default router;
