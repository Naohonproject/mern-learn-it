const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// @routes POST api/posts
// @desc Create post
// @access Private
router.post("/", async (req, res) => {
  const { title, description, url, status } = req.body;

  console.log(req.body);

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
      user: "6323bb902250f04bb877bc7d",
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

module.exports = router;
