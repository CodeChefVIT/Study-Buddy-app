const { join } = require('path')
const { Feedback, Rate } = require(join(__dirname, '..', 'models', 'Feedback.model'))

exports.feedbackCreate = async (req, res) => {
  const { user, message } = req.body
  try {
    const feedback = await Feedback.create({
      user,
      message
    })
    res.json({
      message: 'Feedback created',
      feedback
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.rateUs = async (req, res) => {
  const { user, rating } = req.body
  try {
    const rate = await Rate.create({
      user,
      rating
    })
    res.json({
      message: 'Rate created',
      rate
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}
