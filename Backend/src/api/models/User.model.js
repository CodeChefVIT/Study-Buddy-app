const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String },
    graduatingYear: { type: Number },
    major: { type: String },
    bio: { type: String },
    hash: { type: String }
  },
  { timestamps: true }
)
// subjects
// refer
module.exports = mongoose.model('User', UserSchema)
