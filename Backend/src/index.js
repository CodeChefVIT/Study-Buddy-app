const { join } = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require(join(__dirname, 'api', 'routes', 'v1'))

require(join(__dirname, 'config', 'database'))

// Prevent common security vulnerabilities
app.use(helmet())

// use morgan to log at command line
if (process.env.NODE_ENV !== 'test') app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.set('trust proxy', true)
app.use(cors(corsOptions))
// Parse json body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors());

mongoose.Promise = global.Promise

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

app.use('/api/v1/', routes)
// // redirect if no other route is hit
// app.use((req, res) => {
//   res.redirect('https://www.google.com')
// })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app
