const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regno: { type: String, default: null },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String, default: null },
    graduatingYear: { type: Number, default: null },
    major: { type: String, default: null },
    bio: { type: String, default: null },
    hash: { type: String }
  },
  { timestamps: true }
)
// subjects
// refer
module.exports = mongoose.model('User', UserSchema)
