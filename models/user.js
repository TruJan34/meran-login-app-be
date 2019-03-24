const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required!'],
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required!'],
    trim: true
  },
  email: {
    type: String,
    validate: {
      validator: value => {
        return value ? /\S+@\S+\.\S+/.test(value) : true;
      },
      message: 'Invalid Email Address!'
    },
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true
  }
});

module.exports = mongoose.model('User', UserSchema);
