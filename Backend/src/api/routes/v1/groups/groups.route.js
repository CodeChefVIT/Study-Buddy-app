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
  Request: Joi.object({
    group: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
    user: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
  }),

  getQuiz: Joi.object({
    id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
  }),
  id: Joi.object({
    group: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
  }),
  createQuiz: Joi.object({
    // group: Joi.string().required(),
    time: Joi.string().required().regex(/^[0-9]{1,2}:[0-9]{2}$/),
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
  })
}

router.post('/new', validate(schema.createGroup, 'body'), authorise, groups.createGroup)
router.get('/', validate(schema.getAllGroups, 'query'), authorise, groups.getAllGroups)
router.get('/request/:inviteCode', validate(schema.requestGroup, 'params'), authorise, groups.requestGroup)

router.get('/user', authorise, groups.getUserGroups)
router.get('/:id', validate(schema.getQuiz, 'params'), authorise, groups.getGroup)

router.get('/:group/request', authorise, groups.getRequests)
router.get('/request/accept/:group/:user', validate(schema.Request, 'params'), authorise, groups.acceptRequest)
router.get('/request/reject/:group/:user', validate(schema.Request, 'params'), authorise, groups.rejectRequest)
// quiz stuff here
router.post('/:group/quiz/new', validate(schema.id, 'params', 'Invalid Group ID'), validate(schema.createQuiz, 'body'), authorise, quiz.createQuiz)
router.get('/:group/quiz', validate(schema.id, 'params', 'Invalid Group ID'), authorise, quiz.getQuizzes)
router.get('/quiz/:id', validate(schema.getQuiz, 'params', 'Invalid Quiz ID'), authorise, quiz.getQuiz)
router.post('/quiz/attempt/:id', validate(schema.getQuiz, 'params', 'Invalid Quiz ID'), validate(schema.attemptQuiz, 'body'), authorise, quiz.attemptQuiz)
router.get('/quiz/:id/score', validate(schema.getQuiz, 'params', 'Invalid Quiz ID'), authorise, quiz.getQuizScore)
// to test s
router.delete('/quiz/:id', validate(schema.getQuiz, 'params', 'Invalid Quiz ID'), authorise, quiz.deleteQuiz)

module.exports = router
