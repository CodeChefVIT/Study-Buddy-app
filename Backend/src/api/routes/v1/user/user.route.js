const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const user = require(join(__dirname, '..', '..', '..', 'controllers', 'user.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))

const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(), // ! Email Regex is not working for some cases
    regno: Joi.string().regex(/^[1-9]{1}[0-9]{1}[A-Z]{3}[0-9]{4}/).required(),
    password: Joi.string().required(),
    confirm: Joi.string().required(),
    avatar: Joi.string(),
    graduatingYear: Joi.number(),
    major: Joi.string().required(),
    bio: Joi.string()
  }),
  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),
  edit: Joi.object({
    name: Joi.string(),
    // regno: Joi.string().regex(/^[1-9]{1}[0-9]{1}[A-Z]{3}[0-9]{4}/),
    // email: Joi.string().email(),
    avatar: Joi.object(),
    oldPass: Joi.string(),
    newPass: Joi.string(),
    confirmPass: Joi.string(),
    bio: Joi.string()
  }),
  resend: Joi.object({
    email: Joi.string().required().email()
  }),
  verify: Joi.object({
    id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
    hash: Joi.string().required()
  })
}

router.post('/signup', validate(schema.signup, 'body'), user.signup)

router.post('/login', validate(schema.login, 'body'), user.login)

router.patch('/edit', authorise, validate(schema.edit, 'body'), user.edit)

router.post('/resend', validate(schema.resend, 'body'), user.resend)

router.get('/verify/:id/:hash', validate(schema.verify, 'params', 'Invalid verification link'), user.verify)

router.get('/', authorise, user.get)

module.exports = router
