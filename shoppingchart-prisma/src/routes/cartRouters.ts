import { Router } from "express";
import { getAllCarts, createCart, getCartByID, deleteCart } from "../controllers/cartController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, getAllCarts);
router.get("/:id", verifyToken, getCartByID);
router.delete("/:id", verifyToken, deleteCart);
router.post("/", verifyToken, createCart);

export default router;
