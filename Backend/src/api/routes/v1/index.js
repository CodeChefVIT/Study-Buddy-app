const { join } = require('path')
const express = require('express')

// import all the routes here
const userRoute = require(join(__dirname, 'user', 'user.route'))
const feedbackRoute = require(join(__dirname, 'feedback', 'feedback.route'))
const router = express.Router()

router.use('/user', userRoute)
router.use('/feedback', feedbackRoute)

module.exports = router
