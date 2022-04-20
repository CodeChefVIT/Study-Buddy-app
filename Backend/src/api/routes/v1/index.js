const { join } = require('path')
const express = require('express')

// import all the routes here
const userRoute = require(join(__dirname, 'user', 'user.route'))

const router = express.Router()

router.use('/user', userRoute)

module.exports = router
