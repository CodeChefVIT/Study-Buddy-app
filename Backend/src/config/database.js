require('dotenv').config()
const mongoose = require('mongoose')
let url = process.env.MONGO_URL

if (process.env.NODE_ENV === 'test') { url = process.env.MONGO_TEST_URL }

(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (err) {
    console.log('Error occured: ', err.toString())
  }
})()

const connection = mongoose.connection

connection.once('open', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Connected to MongoDB')
  }
})

connection.on('disconnected', () => {
  console.log('Disconnected event to database at')
})

connection.on('reconnectFailed', () => {
  console.log('ReconnectFailed event to database at')
})

connection.on('error', () => {
  console.log('Database connection error while connecting at')
})
