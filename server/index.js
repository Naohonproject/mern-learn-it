const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning.ziel6un.mongodb.net/learnit?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    process.exit(1);
  }
};
connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => console.log(`server runs on Port ${PORT}`));
