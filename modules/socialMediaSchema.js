const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({
  instaHandle: {
    type: String
  },
  fbHandle: {
    type: String
  }
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
