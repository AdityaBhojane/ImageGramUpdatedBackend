import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryModule from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "./serverConfig.js";

// Cloudinary configuration
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

// Cloudinary storage configuration
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",  // Customize your Cloudinary folder name here
        format: async (req, file) => "jpg", // Supports jpg, png, etc.
        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return `${file.fieldname}-${uniqueSuffix}`;
        },
    },
});

export const cloudinaryUploader = multer({ storage: cloudinaryStorage });
