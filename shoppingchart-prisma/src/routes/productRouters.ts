import { Router } from "express";
import productController from "../controllers/productController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, productController.getAllProducts);
router.get("/:id", verifyToken, productController.getProductByID);
router.post("/", verifyToken, productController.createProduct);
router.put("/:id", verifyToken, productController.updateProduct);
router.delete("/:id", verifyToken, productController.deleteProduct);

export default router;
