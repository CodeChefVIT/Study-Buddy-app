const { join } = require('path')
const router = require('express').Router()
const Joi = require('joi')
const groups = require(join(__dirname, '..', '..', '..', 'controllers', 'groups.controller'))
const validate = require(join(__dirname, '..', '..', '..', 'middleware', 'validate.middleware'))
const { authorise } = require(join(__dirname, '..', '..', '..', 'middleware', 'authorise.middleware'))

const schema = {
    getAllGroups: Joi.object({
        subjectID: Joi.string(),
        limit: Joi.number().integer().min(5),
        page: Joi.number().integer().min(1)
    }),
    requestGroup: Joi.object({
        inviteCode: Joi.string().required()
    }),
    createGroup: Joi.object({
        subjectID: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
    }),
    getGroup: Joi.object({
        id: Joi.string().required()
    }),
    acceptRequest: Joi.object({
        group: Joi.string().required(),
        user: Joi.string().required()
    }),
}


router.get('/', authorise, validate(schema.getAllGroups, 'query'), groups.getAllGroups);
router.get('/request', authorise, validate(schema.requestGroup , 'query'), groups.requestGroup);
router.get('/user', authorise, groups.getUserGroups); // tested
router.post('/create', authorise, validate(schema.createGroup, 'body'), groups.createGroup);
router.get('/:id', authorise, validate(schema.getGroup, 'params'), groups.getGroup);
router.post('/accept', authorise, validate(schema.acceptRequest, 'body'), groups.acceptRequest);

module.exports = router
