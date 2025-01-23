import { Router } from "express";
import addressController from "../controllers/addressController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, addressController.getAllAddress);
router.get("/:id", verifyToken, addressController.getAddressByID);
router.post("/", verifyToken, addressController.createAddress);
router.put("/:id", verifyToken, addressController.updateAddress);
router.delete("/:id", verifyToken, addressController.deleteAddress);

export default router;
