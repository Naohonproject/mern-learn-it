const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app = express();
const PORT = 5000;
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
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`server runs on Port ${PORT}`));
