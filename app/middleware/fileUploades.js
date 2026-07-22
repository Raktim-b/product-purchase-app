const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "clothing",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});
// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpg": "jpg",
//   "image/jpeg": "jpeg",
//   "image/webp": "webp",
//   "image/gif": "gif",
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("invalid image type");
//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, "upload");
//   },
//   filename: (req, file, cb) => {
//     const filename = file.originalname.split(" ").join("-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${filename}-${Date.now}.${extension}`);
//   },
// });
const ProductImage = multer({ storage: storage });
module.exports = ProductImage;
