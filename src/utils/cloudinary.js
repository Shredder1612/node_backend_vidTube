import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// ── Step 1: Configure Cloudinary ──────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    console.log(`File uploaded on Cloudinary. File src: ${response.url}`);

    // once the file is uploaded, we would like to delete it from our server
    fs.unlinkSync(localFilepath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilepath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary. Public Id: ", publicId);
  } catch (error) {
    console.log("Error deleting from Cloudinary", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
