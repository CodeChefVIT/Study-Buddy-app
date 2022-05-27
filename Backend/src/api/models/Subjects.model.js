const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
})

module.exports = mongoose.model('Subject', subjectSchema)
