const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const groups = require(join(__dirname, '..', '..', '..', 'controllers', 'groups.controller'))
const quiz = require(join(__dirname, '..', '..', '..', 'controllers', 'quiz.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))

const schema = {
  getAllGroups: Joi.object({
    subject: Joi.string(),
    limit: Joi.number().integer().min(5),
    page: Joi.number().integer().min(1)
  }),
  requestGroup: Joi.object({
    inviteCode: Joi.string().required()
  }),
  createGroup: Joi.object({
    name: Joi.string().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    modules: Joi.array().items({
      name: Joi.string().required(),
      daysToComplete: Joi.number().integer().min(1).required()
    })
  }),
  getGroup: Joi.object({
    id: Joi.string().required()
  }),
  Request: Joi.object({
    group: Joi.string().required(),
    user: Joi.string().required()
  }),

  getQuiz: Joi.object({
    id: Joi.string().required()
  }),
  createQuiz: Joi.object({
    group: Joi.string().required(),
    // time: Joi.number().integer().min(1).required(),
    creator: Joi.string().required(),
    questions: Joi.array().items({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string().required()).min(2).required(),
      answer: Joi.string().required()
    })
  }),
  attemptQuiz: Joi.object({
    quizID: Joi.string().required(),
    QuestionData: Joi.array().items({
      question: Joi.string().required(),
      answer: Joi.string().required()
    })
  }),
  getQuizScore: Joi.object({
    quizID: Joi.string().required()
  }),
  deleteQuiz: Joi.object({
    quizID: Joi.string().required()
  })

}

router.post('/new', authorise, validate(schema.createGroup, 'body'), groups.createGroup) 
router.get('/', authorise, validate(schema.getAllGroups, 'query'), groups.getAllGroups)   
router.get('/request/:inviteCode', authorise, validate(schema.requestGroup, 'params'), groups.requestGroup) //tested
router.get('/user', authorise, groups.getUserGroups) 
router.get('/:id', authorise, validate(schema.getGroup, 'params'), groups.getGroup)
router.get('/request/accept/:group/:user', authorise, validate(schema.Request, 'params'), groups.acceptRequest)
router.get('/request/reject/:group/:user', authorise, validate(schema.Request, 'params'), groups.rejectRequest)

// quiz stuff here
router.post('/quiz/new', authorise, validate(schema.createQuiz, 'body'), quiz.createQuiz)
router.get('/quiz/:id', authorise, validate(schema.getQuiz, 'params'), quiz.getQuiz)
router.post('/quiz/attempt', authorise, validate(schema.attemptQuiz, 'body'), quiz.attemptQuiz)
router.get('/quiz/:quizID/score', authorise, validate(schema.getQuizScore, 'params'), quiz.getQuizScore)
router.get('/quiz/:quizID/delete', authorise, validate(schema.deleteQuiz, 'params'), quiz.deleteQuiz)

module.exports = router
