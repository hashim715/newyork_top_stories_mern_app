const RegisterSchema = require("../models/register");
const jwt = require("jsonwebtoken");
const refreshToken = async (req, res, next) => {
  const { access } = req.body;
  try {
    const user = await RegisterSchema.findOne({ accessToken: access });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const decoded = jwt.verify(access, process.env.JWT_SECRET_REFRESH);
    await sendToken(user, decoded.username, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error occurred",
    });
  }
};
const sendToken = async (user, username, statusCode, res) => {
  const token = await user.getSignedToken(user, username);
  return res.status(statusCode).json({
    success: true,
    access: token.access,
  });
  ("");
};
module.exports = { refreshToken };
