const cloudinary = require("cloudinary").v2;

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
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};


module.exports = { singleImageUpload };
