import {Router} from "express"
import cartItemController from "../controllers/cartItemController"

const router = Router()

router.get('/',cartItemController.getAllCartItems)
router.get('/:id',cartItemController.getCartItemById)
router.put('/:id',cartItemController.updateCartItem) //req by param id & body contains quantity
router.post('/',cartItemController.addCartItem) //req by body contains cartId, productId, and quantity
router.delete('/:id',cartItemController.deleteCartItem)

export default router