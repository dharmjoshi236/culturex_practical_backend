const jwt = require("jsonwebtoken");
const {jwtSecret}  = require("../constants/envConstants");
const userModel = require("../models/userModel");
const { messages, status } = require("../constants/messages");

const authorizeUser = async (req, res, next) => {
  try {
    let getBearerToken = req.headers["authorization"];

    if (typeof getBearerToken !== "undefined") {
      let splitToken = getBearerToken.split(" ");
      let token = splitToken[1];

      const verifyToken = jwt.verify(token, jwtSecret);
      if (verifyToken && verifyToken.userId) {
        let findUser = await userModel.findById(verifyToken.userId);

        if (!findUser) {
          return response(
            res,
            {},
            0,
            messages.USER_NOT_FOUND,
            status.UNAUTHORIZED
          );
        } else {
          req.userId = findUser._id;
          req.userEmail = findUser.email;
          next();
        }
      } else {
        return response(
          res,
          {},
          0,
          messages.USER_NOT_AUTHORIZED,
          status.UNAUTHORIZED
        );
      }
    } else {
      return response(
        res,
        {},
        0,
        messages.USER_NOT_AUTHORIZED,
        status.UNAUTHORIZED
      );
    }
  } catch (error) {
    return response(res, {}, 0, messages.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  authorizeUser,
};
