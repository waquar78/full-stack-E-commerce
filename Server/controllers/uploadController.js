import { uploadToCloudinary } from "../Utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);
    console.log("Uploaded Image URL:", imageUrl);

    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Image Upload Failed", error: error.message });
  }
};
 