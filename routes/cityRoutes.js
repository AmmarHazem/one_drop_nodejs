import express from "express";
import { getCities, createCity } from "../controllers/cityControllers";

const router = express.Router();

router.post("/", createCity);
router.get("/", getCities);

export default router;
