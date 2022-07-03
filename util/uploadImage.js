const cloudinary = require("cloudinary").v2;

const uplaodImage = async (file, folder) => {
  return await cloudinary.uploader.upload(file, { folder });
};

module.exports = uplaodImage;
