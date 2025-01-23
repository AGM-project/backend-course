import {Router} from "express"
import cartController from "../controllers/cartController"

const router = Router()

router.get('/',cartController.getAllCarts)
router.get('/:id',cartController.getCartById)
router.post('/',cartController.createCart)
router.delete('/:id',cartController.deleteCart)

export default router