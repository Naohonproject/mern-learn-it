const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

// @routes GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    //   try to take all post of current user in database
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "userName",
    ]);
    //   if posts exist, Post.find() eventually fullfil, res
    res.json({ success: true, posts });
  } catch (error) {
    //   if there is error in Post.find() the error will be catch here then response error
    //   error status and error message to client
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @routes POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  // if user request body valid,create new post
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    // save new post to database
    await newPost.save();

    //   if newPost.save() fullfil , return the response with
    //   post recently create to client to render
    res.json({
      success: true,
      message: "Happy Learning!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @routes PUT api/posts
// @desc Update posts
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    //   try to crate a object name updatedPost from req.body
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    // create an object to be as a condition for finding the post in database
    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    //   find the post with id and user name then update that post
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      {
        new: true,
      }
    );

    //   check user not authorized to have right to update
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not unauthorized",
      });
    }
    // if updatedPost exist, means findAndUpdate eventually fulfil,return to client
    // the json view includes the updated post
    res.json({
      success: true,
      post: updatedPost,
      message: "Excellent Progress!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
