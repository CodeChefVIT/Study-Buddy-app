const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const user = require(join(__dirname, '..', '..', '..', 'controllers', 'user.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))
const vitEmailRegex = /^([A-Za-z]+\.[A-za-z]+[0-9]{4,4}@vitstudent.ac.in)/gm;
// to do
// add verification
const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(vitEmailRegex).required(),
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
