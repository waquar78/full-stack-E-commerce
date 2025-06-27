import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js";
import { addToCart, emptyCart, getMyCart, removeFromCart, updateCartQuantity } from "../controllers/cartController.js";

const router=express.Router();

router.route("/addToCart").post(verifyToken,addToCart);
router.route("/removeFromCart").delete(verifyToken,removeFromCart);
router.route("/my-cart").get(verifyToken, getMyCart);
router.route("/updateQuantity").put( verifyToken, updateCartQuantity);
router.route("/empty").delete( verifyToken, emptyCart);
export default router