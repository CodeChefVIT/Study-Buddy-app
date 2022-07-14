require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const upload = async (id, buffer, originalname) => {
  if (process.NODE_ENV === 'test') {
    const data = {
      Location: 'this worked',
      name: originalname
    }
    return data
  }
  try {
    // check if image
    const fileType = buffer.toString('hex', 0, 4).toLowerCase()
    if (fileType !== '89504e47') {
      return false
    }
    const fileExtension = originalname.split('.').pop()
    // upload image to s3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${id}.${fileExtension}`,
      Body: buffer
    }
    const data = await s3.upload(params).promise()
    return data
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = upload
