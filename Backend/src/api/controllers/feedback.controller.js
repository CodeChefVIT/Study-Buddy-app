const { join } = require('path')
const { Feedback, Rate } = require(join(__dirname, '..', 'models', 'Feedback.model'))

exports.feedbackCreate = async (req, res) => {
  const { message } = req.body
  const user = req.user.id
  try {
    const feedback = await Feedback.create({
      user,
      message
    })
    return res.json({
      success: true,
      message: 'Feedback created',
      feedback
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

exports.rateUs = async (req, res) => {
  const { rating } = req.body
  const user = req.user.id
  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      })
    }
    const rate = await Rate.create({
      user,
      rating
    })
    return res.json({
      success: true,
      message: 'Rate created',
      rate
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}
