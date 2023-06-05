const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const experienceSchema = new Schema({
  jobType: {
    type: [String],
    required: true,
  },
  spokenLanguages: {
    type: [String],
    required: true,
  },
  additionalExperiences: {
    type: [String],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["No Exp", "Some Exp", "Very Exp"],
    required: true,
  },
  detailsOfExperiences: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
