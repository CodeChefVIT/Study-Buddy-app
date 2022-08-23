require('dotenv').config()
const AWS = require('aws-sdk')
const { join } = require('path')
const logger = require(join(__dirname, '..', '..', 'config', 'logger'))
const NAMESPACE = 'S3 UPLOAD WORKER'

const upload = async (id, buffer, originalname) => {
  if (process.env.NODE_ENV === 'test') {
    const data = {
      Location: 'this worked',
      name: originalname
    }
    logger.debug(NAMESPACE, 'Uploaded file', data)
    return data
  }
  logger.info(NAMESPACE, 'Uploading file Request')
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    const fileExtension = originalname.split('.').pop()
    // upload image to s3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${id}.${fileExtension}`,
      Body: buffer
    }
    logger.info(NAMESPACE, 'Uploading file to S3')
    const data = await s3.upload(params).promise()
    logger.debug(NAMESPACE, 'Uploaded file')
    return data
  } catch (err) {
    logger.error(NAMESPACE, 'Error uploading file', err)
    return false
  }
}

module.exports = upload
