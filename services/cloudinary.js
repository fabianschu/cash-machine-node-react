const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadBase64 = async (file) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(file);
    return secure_url;
  } catch (e) {
    return new Error("image upload failed");
  }
};

module.exports = { uploadBase64 };
