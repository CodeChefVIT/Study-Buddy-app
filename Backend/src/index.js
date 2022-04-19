const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
// const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./api/routes/v1')
require('./database')

// Prevent common security vulnerabilities
app.use(helmet())

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
