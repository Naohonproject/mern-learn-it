const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

// @routes GET api/auth
// @desc Check whether user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

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

    // save user recently created to mongDb cloud, this async function
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @routes POST api/auth/login
// @desc login user
// @access Public
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  // simplest validation
  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: " user name and/or password are missing",
    });
  }

  try {
    // check for existing user
    const user = await User.findOne({ userName: userName });

    // user name not found in db , response with error message
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user name or password is invalid",
      });
    }
    // user name found,verify password
    const isValidPassword = await argon2.verify(user.password, password);
    // if password user input not match password was stored in db, response with error message
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "user name or password is invalid",
      });
    }
    // all checking case passed , all good, return access token to client

    // return token after register successfully if create new user successfully
    // create jwt to return to client to validate user
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    // response a json
    res.json({
      success: true,
      message: "Logged in Successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
