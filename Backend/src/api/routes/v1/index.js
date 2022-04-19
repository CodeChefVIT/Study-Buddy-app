const express = require('express')

// import all the routes here
const userRoute = require('./user/user.route')

const router = express.Router()

router.use('/user', userRoute)

module.exports = router
