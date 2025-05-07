import express from "express"
import { cancelOrder, getOrders, placeOrder } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route("/place").post(verifyToken, placeOrder);
router.route("/").get(verifyToken, getOrders);
router.route("/:orderId/cancel").patch(verifyToken, cancelOrder);

export default router;