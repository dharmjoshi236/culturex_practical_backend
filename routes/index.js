const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/index");
const mediaRoutes = require("./media/index");

router.use("/auth", authRoutes);
router.use("/media", mediaRoutes);

module.exports = router;
