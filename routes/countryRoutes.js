import express from "express";
import { getCountries, createCountry } from "../controllers/countryControllers";

const router = express.Router();

router.post("/", createCountry);
router.get("/", getCountries);

export default router;
