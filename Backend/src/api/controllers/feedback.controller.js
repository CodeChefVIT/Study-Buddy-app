const { join } = require('path')
const { Feedback, Rate } = require(join(__dirname, '..', 'models', 'Feedback.model'))
const logger = require(join(__dirname, '..', '..', 'config', 'logger'))

const NAMESPACE = 'FEEDBACK CONTROLLER'

exports.feedbackCreate = async (req, res) => {
  const { message } = req.body
  const user = req.user.id
  try {
    const feedback = await Feedback.create({
      user,
      message
    })
    logger.info(NAMESPACE, 'Feedback created', feedback)
    return res.json({
      success: true,
      message: 'Feedback created',
      feedback
    })
  } catch (error) {
    logger.error(NAMESPACE, 'Error creating feedback', error)
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
    logger.info(NAMESPACE, 'Rate created', rate)
    return res.json({
      success: true,
      message: 'Rate created',
      rate
    })
  } catch (error) {
    logger.error(NAMESPACE, 'Error creating rate', error)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}
