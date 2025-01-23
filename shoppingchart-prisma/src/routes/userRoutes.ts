import {Router} from "express"
import userController from "../controllers/userController"

const router = Router()

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.put('/:id',userController.editUser)
router.delete('/:id',userController.deleteUser)

export default router