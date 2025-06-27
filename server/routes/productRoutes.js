// import express from "express";
// import { verifyToken } from "../middleware/authMiddleware.js";
// import { createProduct, deleteProduct, getAllProducts, getFilteredProducts, singleProductById, updateProduct, getMyProducts } from "../controllers/productController.js";

// const router = express.Router();

// router.route("/").post(verifyToken, createProduct);
// router.route("/").get(getAllProducts);
// router.route("/:id").get(singleProductById);
// router.route("/:id").put(verifyToken, updateProduct);
// router.route("/:id").delete(verifyToken, deleteProduct);
// router.route("/filtered").get(getFilteredProducts);
// router.route("/my-products").get(verifyToken, getMyProducts);

// export default router;


// routes/productRoute.js

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  singleProductById,
  updateProduct,
  getMyProducts,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Create & get all
router.route("/")
  .post(verifyToken, createProduct)
  .get(getAllProducts);

// ✅ Get my products (IMPORTANT: this MUST come before `/:id`)
router.route("/my-products")
  .get(verifyToken, getMyProducts);

// ✅ Filtered route (can be before or after `/:id` since no conflict with ObjectId)
router.route("/filtered")
  .get(getFilteredProducts);

// ✅ Single Product (get, update, delete)
router.route("/:id")
  .get(singleProductById)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);

export default router;
