import express from "express"
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../Utils/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";

 const router=express.Router();

router.route("/upload").post(verifyToken,upload.single("image"),uploadImage);

export default router;