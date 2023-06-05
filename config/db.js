const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://SivaChow:wNTm5hpFR4L9qf7o@cluster0.xfre2sz.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;
