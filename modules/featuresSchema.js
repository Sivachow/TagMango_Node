const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const featuresSchema = new Schema({
  ethnicity: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  heightUnit: {
    type: String,
    enum: ['cm', 'feet'],
    required: true,
  },
  chestSize: {
    type: Number,
    required: true,
  },
  waistSize: {
    type: Number,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  hairColor: {
    type: String,
    required: true,
  },
  atypicalFeatures: {
    type: String,
    required: true,
  },
});

const Features = mongoose.model('Features', featuresSchema);

module.exports = Features;
