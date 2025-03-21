const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../constants/envConstants");
const { OAuth2Client } = require("google-auth-library");

const googleAuthService = async (reqBody) => {
  try {
    const { credential, client_id } = reqBody;

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    let findUser = await userModel.findOne({
      email: email,
    });

    if (!findUser) {
      findUser = await userModel.create({email: email, userName: `${given_name}_${family_name}`});
    }

    const generateToken = jwt.sign(
      {
        userId: findUser._id,
        userEmail: findUser.email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    if (generateToken) {
      return { ...findUser._doc, token: generateToken };
    } else {
      return 2; // Unable to login, Please try again
    }
  } catch (error) {
    console.log("error in login user service ", error);
    throw new Error();
  }
};

module.exports = {
    googleAuthService
}
