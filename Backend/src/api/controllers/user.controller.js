const { join } = require('path')
const User = require(join(__dirname, '..', 'models', 'User.model'))
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtsecret = process.env.SECRET_JWT || 'secret123'
const expiresIn = process.env.JWT_EXPIRES_IN || '7d'

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
  const { name, email, password, avatar, graduatingYear, major, bio } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    const newUser = new User({
      name,
      email,
      password,
      avatar,
      graduatingYear,
      major,
      bio
    })
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()
    const token = createToken(newUser.id, newUser.email, newUser.name)
    res.header('auth-token', token).json({
      message: 'User created',
      token
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
