const express = require("express");
const router = express.Router();

const {
  register,
  login,
  get_top_stories,
} = require("../controllers/controllers");
const protect = require("../middleware/auth");
const { refreshToken } = require("../controllers/refreshToken");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/refresh").post(refreshToken);
router.route("/get_top_stories").get(protect, get_top_stories);

module.exports = router;
