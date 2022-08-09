const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regno: { type: String, default: null },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    graduatingYear: { type: Number, default: null },
    major: { type: String, default: null },
    avatar: { type: String, default: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' },
    bio: { type: String, default: null },
    hash: { type: String }
  },
  { timestamps: true }
)
// subjects
// refer
module.exports = mongoose.model('User', UserSchema)
