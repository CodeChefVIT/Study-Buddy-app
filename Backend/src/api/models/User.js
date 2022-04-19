const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    graduatingYear: { type: Number },
    major: { type: String },
    bio: { type: String },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
