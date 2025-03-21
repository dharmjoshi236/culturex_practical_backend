const express = require("express");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const { nodePort } = require("./constants/envConstants");
const connectDb = require("./dbConnection");
const path = require("path");
const multer = require("multer");
const response = require("responsify-requests");
const { BAD_REQUEST } = require("responsify-requests/constants/statusCode");
const { status } = require("./constants/messages");

const app = express();

connectDb();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", indexRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return response(res, {}, 0, err.message, status.BAD_REQUEST);
  } else if (err) {
    return response(res, {}, 0, err.message, status.BAD_REQUEST);
  } else {
    next();
  }
});

app.listen(nodePort, () => {
  console.log(`Server is listening on port ${nodePort}`);
});
