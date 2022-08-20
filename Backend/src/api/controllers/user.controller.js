require('dotenv').config()
const { join } = require('path')
const User = require(join(__dirname, '..', 'models', 'User.model'))
const jwt = require('jsonwebtoken')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const sendEmail = require(join(__dirname, '..', 'workers', 'sendEmail.worker'))
const s3Upload = require(join(__dirname, '..', 'workers', 's3BucketUpload.worker'))
const jwtsecret = process.env.SECRET_JWT || 'secret123'
const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
const frontendURL = process.env.FRONTEND_URL

const logger = require(join(__dirname, '..', '..', 'config', 'logger'))
const NAMESPACE = 'USER CONTROLLER'

const createToken = (id, email, name) => {
  return jwt.sign(
    {
      id,
      email,
      name
    },
    jwtsecret,
    {
      expiresIn
    }
  )
}
/*
  Type: POST
  Desc: To Create a User
  Auth: None
  Query: None
  Params: None
  Body [Required]: name, email, password, confirm
  Body [Optional]: graduatingYear, major, bio
  Returns: Success Message
*/
exports.signup = async (req, res) => {
  const { name, email, password, confirm, regno, graduatingYear, major, bio } = req.body
  logger.info(NAMESPACE, 'Signup request received')
  try {
    if (!(password === confirm)) {
      return res.status(422).json({
        success: false,
        error: 'Passwords do not match'
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      })
    }
    // email verification hash
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newUser = new User({
      name,
      email,
      regno,
      password,
      confirm,
      graduatingYear,
      major,
      bio,
      hash
    })
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    const link = 'http://' + req.get('host') + '/api/v1/user/verify/' + newUser.id + '/' + hash
    await sendEmail(email, 'Verify Your Email', `Verify your email at ${link}`)
    await newUser.save()
    logger.info(NAMESPACE, 'Signup successful')
    return res.status(200).json({
      success: true,
      message: 'User created, Check email for verification'
    })
  } catch (error) {
    logger.error(NAMESPACE, 'Signup failed', error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
/*
  Type: POST
  Desc: To Login a User
  Auth: None
  Query: None
  Params: None
  Body: email, password
  Returns: Token (in Header "Authorisation"), Success Message
*/
exports.login = async (req, res) => {
  const { email, password } = req.body
  logger.info(NAMESPACE, 'Login request received')
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User does not exist'
      })
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: 'User is not verified, Please check email'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password'
      })
    }
    const token = createToken(user.id, user.email, user.name)
    logger.info(NAMESPACE, 'Login successful')
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    })
  } catch (error) {
    logger.error(NAMESPACE, 'Login failed', error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

/*
  Type: POST
  Desc: Forgot Password
  Auth: None
  Query: None
  Params: None
  Body: email
  Returns: Success Message
*/
exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  logger.info(NAMESPACE, 'Forgot Password request received')
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(409).json({
        success: false,
        error: 'User not found'
      })
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: 'User is not verified, Resend Verification email instead?'
      })
    }
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    user.hash = hash
    await user.save()
    logger.info(NAMESPACE, 'Forgot Password successful')
    const link = 'https://' + frontendURL + '/user/reset/' + user.id + '/' + hash
    await sendEmail(email, 'Reset Password', `Reset your password at ${link}`)
    return res.status(200).json({
      success: true,
      message: 'Check your email for reset link'
    })
  } catch (error) {
    logger.error(NAMESPACE, 'Forgot Password failed', error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

/*
  Type: GET
  Desc: to verify hash
  Auth: None
  Query: None
  Params: id, hash
  Body: None
*/
exports.verifyhash = async (req, res) => {
  const { id, hash } = req.params
  logger.info(NAMESPACE, 'Verify Hash request received')
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    if (user.hash !== hash) {
      return res.status(401).json({
        success: false,
        error: 'Invalid link'
      })
    }
    logger.info(NAMESPACE, 'Verify Hash successful')
    return res.status(200).json({
      success: true,
      message: 'Reset link is valid',
      email: user.email
    })
  } catch (err) {
    logger.error(NAMESPACE, 'Verify Hash failed', err)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

/*
  Type: POST
  Desc: to reset password
  Auth: None
  Query: None
  Params: id, hash
  Body: password, confirm
*/
exports.resetPassword = async (req, res) => {
  const { password, confirm } = req.body
  const { id, hash } = req.params
  logger.info(NAMESPACE, 'Reset Password request received')
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    if (user.hash !== hash) {
      return res.status(401).json({
        success: false,
        error: 'Invalid link'
      })
    }
    if (!(password === confirm)) {
      return res.status(422).json({
        success: false,
        error: 'Password do not match'
      })
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.hash = ''
    await user.save()
    logger.info(NAMESPACE, 'Reset Password successful')
    return res.status(200).json({
      success: true,
      message: 'Password reset successful'
    })
  } catch (err) {
    logger.error(NAMESPACE, 'Reset Password failed', err)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

/*
  Type: GET
  Desc: To Verify a User
  Auth: None
  Query: None
  Params: id, hash
  Body: None
  Returns: Redirects to login Page
*/

exports.verify = async (req, res) => {
  const { id, hash } = req.params
  logger.info(NAMESPACE, 'Verify request received')
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(409).json({
        success: false,
        error: 'User not found'
      })
    }
    if (user.isVerified) {
      // return res.status(409).json({
      //   success: false,
      //   error: 'User is already verified'
      // })
      logger.info(NAMESPACE, 'User Redirected to login page')
      return res.redirect(frontendURL + '/verified')
    }
    user.isVerified = true
    if (user.hash !== hash) { return res.status(401).json({ success: false, error: "Hash doesn't match" }) }

    await user.save()
    logger.info(NAMESPACE, 'Verify successful')
    // redirect
    return res.redirect(frontendURL + '/verified')
  } catch (error) {
    logger.error(NAMESPACE, 'Verify failed', error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
/*
  Type: POST
  Desc: To Resend the verification email
  Auth: None
  Query: None
  Params: None
  Body: email
  Returns: Success Message
*/

exports.resend = async (req, res) => {
  const { email } = req.body
  logger.info(NAMESPACE, 'Resend request received')
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User does not exist'
      })
    }
    if (user.isVerified) {
      return res.status(409).json({
        success: false,
        error: 'User is already verified'
      })
    }
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    user.hash = hash
    await user.save()
    logger.info(NAMESPACE, 'Resend Email successful')
    const link = 'http://' + req.get('host') + '/api/v1/user/verify/' + user.id + '/' + hash
    await sendEmail(email, 'Verify Your Email', `Verify your email at ${link}`)
    return res.json({
      success: true,
      message: 'Verification Email Sent'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

/*
  Type: PATCH
  ! TO DO
*/

exports.edit = async (req, res) => {
  multer({
    storage: multer.memoryStorage()
  }).single('avatar')(req, res, async (err) => {
    const { name, bio } = req.body
    const { oldPass, newPass, confirmPass } = req.body
    try {
      if (err) return res.status(400).json({ error: err.message })
      const user = await User.findById(req.user.id)
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User does not exist'
        })
      }
      // check for if file is uploaded
      if (name || bio || req.file) {
        if (name) {
          user.name = name
          logger.info(NAMESPACE, 'Name update requested')
        }
        if (bio) {
          user.bio = bio
          logger.info(NAMESPACE, 'Bio update requested')
        }
        if (req.file) {
          logger.info(NAMESPACE, 'Avatar update requested')
          const { originalname, buffer } = req.file
          const data = await s3Upload(req.user.id, buffer, originalname)
          if (!data) {
            logger.error(NAMESPACE, 'S3 Upload failed')
          }
          user.avatar = data.Location
        }
        await user.save()
        logger.info(NAMESPACE, 'Edit successful [NAME OR BIO OR AVATAR]')
        return res.status(200).json({
          success: true,
          message: 'User updated',
          data: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio
          }
        })
      }
      if (!(oldPass && newPass && confirmPass)) {
        return res.status(400).json({
          success: false,
          message: 'Please fill all the fields'
        })
      }
      const isMatch = await bcrypt.compare(oldPass, user.password)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect password'
        })
      }
      if (newPass) {
        if (newPass !== confirmPass) {
          return res.status(400).json({
            success: false,
            message: 'Passwords do not match'
          })
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPass, salt)
      }
      await user.save()
      logger.info(NAMESPACE, 'Edit successful [PASSWORD]')
      return res.json({
        success: true,
        message: 'Password updated',
        data: {
          name: user.name,
          avatar: user.avatar,
          bio: user.bio
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  })
}

/*
  Type:GET
  Desc: Send Information related to user (except password and hash)
  Auth: Bearer Token
  Params: None
  Query: None
  Body: None
  Return: Array Containing all the data
*/

exports.get = async (req, res) => {
  logger.info(NAMESPACE, 'Get User data request recieved')
  let id = req.query.id || req.user.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist'
      })
    }
    const { password, hash, __v, ...data } = user._doc
    logger.info(NAMESPACE, 'Get User data successful')
    return res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}
