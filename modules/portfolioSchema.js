const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  pictures: [
    {
      filename: String,
      contentType: String,
      data: Buffer,
    },
  ],
  videos: [
    {
      filename: String,
      contentType: String,
      data: Buffer,
    },
  ],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
