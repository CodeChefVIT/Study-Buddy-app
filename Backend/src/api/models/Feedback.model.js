const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const RateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
});

module.exports = {
    Feedback: mongoose.model('Feedback', FeedbackSchema),
    Rate: mongoose.model('Rate', RateSchema)
}