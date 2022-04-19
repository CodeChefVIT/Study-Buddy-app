const router = require('express').Router()
const Joi = require('joi')
const user = require('../../../controllers/user.js')
const validate = require('../../../middleware/validate.js')
const { authorise } = require('../../../middleware/authorise.js')

const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    graduatingYear: Joi.number(),
    major: Joi.string(),
    bio: Joi.string()
  }),
  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),
  edit: Joi.object({
    name: Joi.string(),
    currentPassword: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string(),
    avatar: Joi.string(),
    graduatingYear: Joi.number(),
    major: Joi.string(),
    bio: Joi.string()
  })
}

router.post('/signup', validate(schema.signup, 'body'), user.signup)

router.post('/login', validate(schema.login, 'body'), user.login)

router.post('/edit', authorise, validate(schema.edit, 'body'), user.edit)

router.get('/', authorise, user.get)

module.exports = router
