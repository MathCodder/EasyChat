import express from "express";
import { getMessage, postMessage } from "../controllers/message.controller.js";
import { authenticateJWT } from "../middlewares/authJWT.js";

const router = express.Router();

router.post("/post", authenticateJWT, postMessage);
router.get("/all", getMessage);

export default router;
