const express = require("express");
const {
  uploadFileController,
  getFileListController,
} = require("../../controllers/media/index");
const { authorizeUser } = require("../../middlewares/authorizeUserRequest");
const upload = require("../../middlewares/multerUpload");
const router = express.Router();

router.post("/upload", authorizeUser, upload.single("media"), uploadFileController);
router.post("/get-list", authorizeUser, getFileListController);

module.exports = router;
