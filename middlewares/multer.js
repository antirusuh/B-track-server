const multer = require("multer");
const maxSize = 255 * 1024;

const fileStorage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: fileStorage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
}).single("invoice");

module.exports = upload;
