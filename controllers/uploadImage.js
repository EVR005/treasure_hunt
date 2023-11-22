const cloudinary = require("cloudinary").v2;
const url = require("url");

//config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//additional options
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

//uploading the base64-formatted image
const singleImageUpload = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log("hi from image upload!!");
      return reject({ message: "hi from image upload!!" });
    });
  });
};

const removeImage = (image) => {
  const parsedUrl = url.parse(image);

  // Extract the public ID from the path
  const pathParts = parsedUrl.pathname.split("/");
  const publicId = pathParts[pathParts.length - 1].split(".")[0];
  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error("Error deleting image:", error);
    } else {
      console.log("Image deleted successfully:", result);
    }
  });
};

module.exports = { singleImageUpload, removeImage };
