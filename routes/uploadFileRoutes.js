import express from "express";
import { uploadFile } from "../controllers/uploadFileControllers";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const router = express.Router();

router.post("/", [authenticationMiddleware], uploadFile);

export default router;
