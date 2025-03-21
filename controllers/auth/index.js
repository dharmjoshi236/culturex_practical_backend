const { googleAuthService } = require("../../services/auth");
const response = require("responsify-requests");
const { messages, status } = require("../../constants/messages");

const loginUserController = async (req, res) => {
  try {
    console.log("google is calling the api ", req.body)
    const loginService = await googleAuthService(req.body);

    if (loginService == 2) {
      return response(
        res,
        {},
        0,
        messages.USER_LOGIN_FAILURE,
        status.BAD_REQUEST
      );
    } else {
      return response(
        res,
        loginService,
        1,
        messages.USER_LOGIN_SUCCESS,
        status.SUCCESS
      );
    }
  } catch (error) {
    console.log("error in login controller ", error);
    return response(res, {}, 0, "Internal Server Error");
  }
};

module.exports = {
  loginUserController,
};
