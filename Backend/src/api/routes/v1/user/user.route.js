const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const user = require(join(__dirname, '..', '..', '..', 'controllers', 'user.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))

const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/^([A-Za-z]+\.[A-za-z]+[0-9]{4,4}@vitstudent.ac.in)/).required(),
    password: Joi.string().required(),
    confirm: Joi.string().required(),
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
    currentPassword: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    confirmPassword: Joi.string(),
    avatar: Joi.string(),
    graduatingYear: Joi.number(),
    major: Joi.string(),
    bio: Joi.string()
  }),
  resend: Joi.object({
    email: Joi.string().regex(/^([A-Za-z]+\.[A-za-z]+[0-9]{4,4}@vitstudent.ac.in)/).required()
  })
}

router.post('/signup', validate(schema.signup, 'body'), user.signup)

router.post('/login', validate(schema.login, 'body'), user.login)

router.patch('/edit', authorise, validate(schema.edit, 'body'), user.edit)

router.post('/resend', validate(schema.resend, 'body'), user.resend)

router.get('/verify', user.verify)

router.get('/', authorise, user.get)

module.exports = router
