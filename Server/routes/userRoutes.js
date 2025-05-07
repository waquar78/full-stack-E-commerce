import express from "express"
import { register,login,logout, seller, getProfile} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/seller").post(verifyToken,seller);
router.route("/profile").get(verifyToken,getProfile)

export default router;