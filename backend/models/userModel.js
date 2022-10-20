const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    maxLength: [30, "name cannot exceed 30 characters"],
    minLength: [4, "name cannot be less than 4 characters"]
  },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: [8, "password cannot be less than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date
});

module.exports = mongoose.model("User", userSchema);