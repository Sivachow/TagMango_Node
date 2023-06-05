const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  socialMedia: {
    type: Schema.Types.ObjectId,
    ref: 'SocialMedia',
    required: true
  },
  features:{
    type: Schema.Types.ObjectId,
    ref: 'Features',
    required: true
  },
  experience:{
    type: Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  portfolio:{
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  }
});

module.exports = mongoose.model('Person', personSchema);
