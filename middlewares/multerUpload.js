const multer = require("multer");
const { allowedFileTypes, maxFileSize } = require("../constants/messages");
const fs = require('fs')

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const allowedTypesFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`${file.mimetype} filetype is not allowed to be uploaded`), false);
  }
};

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: allowedTypesFilter,
  limits: { fileSize: maxFileSize },
});

module.exports = upload;
