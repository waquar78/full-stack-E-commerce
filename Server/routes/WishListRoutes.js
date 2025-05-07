import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishListController.js"

const router = express.Router()

router.route("/").get(verifyToken,getWishlist);
router.route("/add").post(verifyToken,addToWishlist);
router.route("/remove").delete(verifyToken,removeFromWishlist)

export default router