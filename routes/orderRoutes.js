import express from "express";
import { createOrder, getOrders } from "../controllers/orderControllers";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const router = express.Router();

router.get("/", [authenticationMiddleware], getOrders);
router.post("/", [authenticationMiddleware], createOrder);

export default router;
