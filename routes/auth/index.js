const express = require("express");
const {
  loginUserController,
} = require("../../controllers/auth/index");
const router = express.Router();

router.post("/callback", loginUserController);

module.exports = router;
