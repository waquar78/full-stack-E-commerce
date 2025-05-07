import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Cloudinary Upload Function
export const uploadToCloudinary = async (fileBuffer) => {
    try {
        return await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        return reject(new Error("Image upload failed"));
                    }
                    resolve(result.secure_url);
                }
            );
            stream.end(fileBuffer);
        });
    } catch (error) {
        console.error("Unexpected Error in uploadToCloudinary:", error);
        throw new Error("Something went wrong while uploading image");
    }
};

export default cloudinary;
