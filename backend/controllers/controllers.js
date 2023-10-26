const RegisterSchema = require("../models/register");
require("dotenv").config();
const register = async (req, res, next) => {
  const { username, email, password, first_name, last_name } = req.body;
  try {
    if (!username || !email || !password || !first_name || !last_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the correct input" });
    }
    const username_user = await RegisterSchema.findOne({ username: username });
    const email_user = await RegisterSchema.findOne({ email: email });
    if (username_user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }
    if (email_user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = await RegisterSchema.create({
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });
    await sendToken(user, username, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error occurred",
    });
  }
};
const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username or password is missing" });
  }
  try {
    const user = await RegisterSchema.findOne({ username: username }).select(
      "password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }
    const ismatch = await user.matchPassword(password, user.password);
    if (!ismatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }
    await sendToken(user, username, 200, res);
  } catch (error) {
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
};

const get_top_stories = async (req, res, next) => {
  try {
    const fetch_top_stories = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.api_key}`
    );
    const data = await fetch_top_stories.json();
    if (fetch_top_stories.status === 200) {
      return res.status(200).json({ success: true, message: data });
    } else {
      console.log(data);
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error occurred" });
  }
};

module.exports = { register, login, get_top_stories };
