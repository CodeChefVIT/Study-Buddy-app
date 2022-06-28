const { join } = require('path')
const express = require('express')
const app = express()
const http = require('http')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
// const cors = require('cors');
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require(join(__dirname, 'api', 'routes', 'v1'))
require(join(__dirname, 'config', 'database'))
const isProduction = true
// Prevent common security vulnerabilities
app.use(helmet())
app.use(morgan('dev'))
// log origin of request
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
//     return res.status(200).json({})
//   }
//   console.log(`${req.method} request from ${req.ip}`)

//   next()
// })

// Parse json body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors());

mongoose.Promise = global.Promise

if (!isProduction) {
  app.use(errorhandler())
}
// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

// no stacktraces leaked to users
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

app.use('/api/v1/', routes)

const httpServer = http.createServer(app)
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
