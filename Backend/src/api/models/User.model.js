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
    avatar: { type: String, default: 'https://raw.githubusercontent.com/CodeChefVIT/Study-Buddy-app/1d70ea3029c39d5ec4fee3508423ef0e5d2d9ed9/Frontend/src/assets/img.svg?token=APRMGDUAKNNXHZE6TCBK6MLCZ2JSU' },
    bio: { type: String, default: null },
    hash: { type: String }
  },
  { timestamps: true }
)
// subjects
// refer
module.exports = mongoose.model('User', UserSchema)
