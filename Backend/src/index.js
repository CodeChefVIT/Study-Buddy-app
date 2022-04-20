const { join } = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
// const cors = require('cors');
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require(join(__dirname, 'api', 'routes', 'v1'))
require(join(__dirname, 'config', 'database'))

// Prevent common security vulnerabilities
app.use(helmet())
app.use(morgan('dev'))
// log origin of request
app.use((req, res, next) => {
  console.log(`${req.method} request from ${req.ip}`)
  next()
})
// Parse json body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors());

mongoose.Promise = global.Promise

app.use('/api/v1/', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
