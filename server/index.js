const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const URI = `mongodb+srv://letuanbao:fWDMaykBIVBV8iTx@learning.ziel6un.mongodb.net/learnit?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDatabase();

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log(`server runs on Port ${PORT}`));
