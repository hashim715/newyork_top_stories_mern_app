const jwt = require("jsonwebtoken");
const RegisterUser = require("../models/register");
require("dotenv").config();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
    const user = await RegisterUser.find({ username: decoded.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found and you are not authorized to access this",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
};
module.exports = protect;
