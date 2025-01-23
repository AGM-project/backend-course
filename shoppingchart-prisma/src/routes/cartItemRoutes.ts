import { Router } from "express";
import cartItemController from "../controllers/cartItemController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, cartItemController.getAllCartItems);
router.get("/:id", verifyToken, cartItemController.getCartItemById);
router.put("/:id", verifyToken, cartItemController.updateCartItem); //req by param id & body contains quantity
router.post("/", verifyToken, cartItemController.addCartItem); //req by body contains cartId, productId, and quantity
router.delete("/:id", verifyToken, cartItemController.deleteCartItem);

export default router;
