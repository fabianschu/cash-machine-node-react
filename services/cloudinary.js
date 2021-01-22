const cloudinary = require("cloudinary").v2;

const uploadBase64 = (file) => {
  cloudinary.uploader
    .upload(file)
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
};

module.exports = { uploadBase64 };
