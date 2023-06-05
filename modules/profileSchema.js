const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'nonBinary'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  photo: {
    filename: String,
    contentType: String,
    data: Buffer
  }
});

module.exports = mongoose.model('Profile', profileSchema);
