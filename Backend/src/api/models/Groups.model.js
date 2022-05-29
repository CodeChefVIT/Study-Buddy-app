const mongoose = require('mongoose')

const GroupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  inviteCode: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Groups', GroupsSchema)
