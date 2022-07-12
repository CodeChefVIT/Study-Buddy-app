const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const groups = require(join(__dirname, '..', '..', '..', 'controllers', 'groups.controller'))
const quiz = require(join(__dirname, '..', '..', '..', 'controllers', 'quiz.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))
// ! TO DO add picture to group; use pfp of group as picture
const schema = {
  getAllGroups: Joi.object({
    subject: Joi.string(),
    limit: Joi.number().integer().min(5),
    page: Joi.number().integer().min(1)
  }),
  requestGroup: Joi.object({
    inviteCode: Joi.string().required().regex(/^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/)
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
    // group: Joi.string().required(),
    time: Joi.string().required(),
    // creator: Joi.string().required(),
    questions: Joi.array().items({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string().required()).min(2).required(),
      answer: Joi.string().required()
    })
  }),
  attemptQuiz: Joi.object({
    QuestionData: Joi.array().items({
      question: Joi.string().required(),
      answer: Joi.string().required()
    })
  }),
  getQuizScore: Joi.object({
    id: Joi.string().required()
  }),
  deleteQuiz: Joi.object({
    id: Joi.string().required()
  })

}

router.post('/new', authorise, validate(schema.createGroup, 'body'), groups.createGroup)
router.get('/', authorise, validate(schema.getAllGroups, 'query'), groups.getAllGroups)
router.get('/request/:inviteCode', authorise, validate(schema.requestGroup, 'params'), groups.requestGroup)
router.get('/user', authorise, groups.getUserGroups)
router.get('/:id', authorise, validate(schema.getGroup, 'params'), groups.getGroup)
router.get('/:group/request', authorise, groups.getRequests)
router.get('/request/accept/:group/:user', authorise, validate(schema.Request, 'params'), groups.acceptRequest)
router.get('/request/reject/:group/:user', authorise, validate(schema.Request, 'params'), groups.rejectRequest)
// quiz stuff here
router.post('/:group/quiz/new', authorise, validate(schema.createQuiz, 'body'), quiz.createQuiz)
router.get('/:group/quiz', authorise, quiz.getQuizzes)
router.get('/quiz/:id', authorise, validate(schema.getQuiz, 'params'), quiz.getQuiz)
router.post('/quiz/attempt/:id', authorise, validate(schema.attemptQuiz, 'body'), quiz.attemptQuiz)
router.get('/quiz/:id/score', authorise, validate(schema.getQuizScore, 'params'), quiz.getQuizScore)
// to test s
router.delete('/quiz/:id', authorise, validate(schema.deleteQuiz, 'params'), quiz.deleteQuiz)

module.exports = router
