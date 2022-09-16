const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @routes POST api/auth/register
// @desc Register user
// @access Public

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  // simplest validation
  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: " user name and/or password are missing",
    });
  }

  try {
    // check existing user
    const user = await User.findOne({ userName: userName });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already existed" });
    }

    // hashing password
    const hashedPassword = await argon2.hash(password);

    // create new User instance ,this will be document in mongdb
    const newUser = new User({ userName: userName, password: hashedPassword });

    await newUser.save();

    // return token after register successfully if create new user successfully
    // create jwt to return to client to validate user
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    // response a json
    res.json({
      success: true,
      message: "create account successfully",
      accessToken,
    });
  } catch (error) {}
});

module.exports = router;
