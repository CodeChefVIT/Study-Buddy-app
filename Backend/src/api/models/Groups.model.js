const mongoose = require('mongoose')

const GroupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Groups', GroupsSchema)
