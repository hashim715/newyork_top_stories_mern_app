const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    require: [true, "Please provide username"],
  },
  first_name: {
    type: String,
    minlength: 5,
    maxlength: 30,
  },
  last_name: {
    type: String,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Please provide email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    require: [true, "Please add a Password"],
    minlength: 6,
    select: false,
  },
  accessToken: String,
});

RegisterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
RegisterSchema.methods.matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

RegisterSchema.methods.getSignedToken = async (user, username) => {
  const access_token = jwt.sign(
    { username: username },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: process.env.JWT_REFRESH_EXP }
  );
  const tokens = { access: access_token };
  user.accessToken = access_token;
  await user.save();
  return tokens;
};

const Register = mongoose.model("users", RegisterSchema);

module.exports = Register;
