const { join } = require('path')
const User = require(join(__dirname, '..', 'models', 'User.model'))
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

const jwtsecret = process.env.SECRET_JWT || 'secret123'
const expiresIn = process.env.JWT_EXPIRES_IN || '7d'

const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTPUSER,
    pass: process.env.SMTPPASS
  },
  tls: {
    rejectUnauthorized: false // Important for sending mail from localhost
  }

})

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

exports.signup = async (req, res) => {
  const { name, email, password, avatar, graduatingYear, major, bio, confirm } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    // email verification hash
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newUser = new User({
      name,
      email,
      password,
      confirm,
      avatar,
      graduatingYear,
      major,
      bio,
      hash
    })
    const salt = await bcrypt.genSalt(10)
    if (!(password === confirm)) {
      return res.status(400).json({
        message: 'Passwords do not match'
      })
    }
    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()
    // link to send to user
    const link = 'http://' + req.get('host') + '/api/v1/user/verify?id=' + hash
    // send mail with defined transport object
    // await transporter.sendMail({
    //   from: 'no-reply@studybuddy.com', // sender address
    //   to: email, // list of receivers
    //   subject: 'Verify Your Email', // Subject line
    //   text: `Verify your email at + ${link}`
    // })
    res.status(200).json({
      message: 'User created, Check email for verification'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: 'User is not verified, Please check email'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }
    const token = createToken(user.id, user.email, user.name)
    res.header('auth-token', token).json({
      message: 'User logged in',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.verify = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ id })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: 'User is already verified'
      })
    }
    user.isVerified = true
    user.hash = ''
    await user.save()
    res.json({
      message: 'User verified'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.resend = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: 'User is already verified'
      })
    }
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    user.hash = hash
    await user.save()

    const link = 'http://' + req.get('host') + '/api/v1/user/verify?id=' + hash

    // send mail with defined transport object
    await transporter.sendMail({
      from: 'no-reply@studybuddy.com', // sender address
      to: email, // list of receivers
      subject: 'Verify Your Email', // Subject line
      text: `Verify your email at + ${link}`// plain text body
    })

    res.json({
      message: 'Verification Email Sent'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.edit = async (req, res) => {
  const { name, email, avatar, currentPassword, graduatingYear, major, bio } = req.body
  try {
    const user = await User.findById(req.user.id)
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    if (name) user.name = name
    if (email) user.email = email
    if (avatar) user.avatar = avatar
    if (graduatingYear) user.graduatingYear = graduatingYear
    if (major) user.major = major
    if (bio) user.bio = bio

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
    }
    await user.save()
    res.json({
      message: 'User updated'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    const { password, ...data } = user._doc
    res.json({
      data
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
