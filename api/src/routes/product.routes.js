import { Router } from "express";
import { addProduct, getUserProducts, getMyProducts, deleteProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.single("thumbnail"), addProduct);
router.get("/me", authMiddleware, getMyProducts);
router.get("/:userId", authMiddleware, getUserProducts);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;