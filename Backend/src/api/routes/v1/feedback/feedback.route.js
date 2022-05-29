const { join } = require('path')
const Joi = require('joi')
const router = require('express').Router()
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { feedbackCreate, rateUs } = require(join(__dirname, '..', '..', '..', 'controllers', 'feedback.controller'))

const schema = {
  feedbackCreate: Joi.object({
    message: Joi.string().required()
  }),
  rateUs: Joi.object({
    rating: Joi.number().required()
  })
}

router.post('/create', authorise, validate(schema.feedbackCreate, 'body'), feedbackCreate)

router.post('/rate', authorise, validate(schema.rateUs, 'body'), rateUs)

module.exports = router
