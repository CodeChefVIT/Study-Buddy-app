require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtsecret = process.env.SECRET_JWT || 'secret123'

const authorise = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided.'
    })
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }
  if (token) {
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: 'Invalid Token'
        })
      }
      req.user = decoded
      next()
    })
  } else {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token'
    })
  }
}

module.exports = {
  authorise
}
