require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGO_URL;
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
  console.log('Successfully connected to database')
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
