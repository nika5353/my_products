import { Router } from "express";
import { getAllUsers, getMe } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, getMe);

export default router;