require('dotenv').config()
const { join } = require('path')
const nodemailer = require('nodemailer')
const logger = require(join(__dirname, '..', '..', 'config', 'logger'))
const NAMESPACE = 'SEND EMAIL WORKER'

const sendEmail = async (email, subject, text) => {
  logger.info(NAMESPACE, 'Email sending request')
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
      }
    })

    if (process.env.NODE_ENV !== 'test') {
      logger.info(NAMESPACE, 'Sending email')
      await transporter.sendMail({
        from: 'StudyBuddy CodeChef VIT <no-reply@studybuddy.cc>',
        to: email,
        subject,
        text
      })
      logger.info(NAMESPACE, 'Email sent')
    }
  } catch (error) {
    logger.error(NAMESPACE, 'Error sending email', error)
  }
}

module.exports = sendEmail
