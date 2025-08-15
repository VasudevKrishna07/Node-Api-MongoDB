const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: 2
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: 2
  },
  hobby: {
    type: String,
    required: [true, 'Hobby is required'],
    minlength: 2
  }
  // You can add more fields/validation as needed.
});

module.exports = mongoose.model('User', userSchema);
