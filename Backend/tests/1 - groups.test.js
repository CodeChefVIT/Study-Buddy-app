/* global before, describe, it */
/* eslint handle-callback-err: "warn" */
process.env.NODE_ENV = 'test'

const { Groups } = require('../src/api/models/Groups.model')

// dev deps
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
chai.should()

chai.use(chaiHttp)
let token
// parent block
before(done => {
  // Drop the Groups collection at the start of this
  // test suite to ensure that we start with a clean slate
  Groups.deleteMany({}, err => {
    if (err) {
      console.log(err.stack)
    }
    done()
  })
})
/*
    * Test the Create Group route
*/
describe('/POST /api/v1/groups/new', () => {
  it('Login', done => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'studybuddycc@gmail.com',
        password: 'test'
      })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('token')
        token = res.body.token
        done()
      })
  })
  it('Missing fields', done => {
    chai.request(server)
      .post('/api/v1/groups/new')
      .set('x-access-token', token)
      .send({
        subject: 'math',
        description: 'test',
        modules: [{
          name: 'test',
          daysToComplete: 1
        }]
      })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        done()
      })
  })
  it('Invalid module schema', done => {
    chai.request(server)
      .post('/api/v1/groups/new')
      .set('x-access-token', token)
      .send({
        name: 'test',
        subject: 'math',
        description: 'test',
        modules: [{
          name: 'test',
          daysToComplete: 'sd',
          moduleSchema: 'test'
        }]
      })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        done()
      })
  })
  it('Successful creation', done => {
    chai.request(server)
      .post('/api/v1/groups/new')
      .set('x-access-token', token)
      .send({
        name: 'test',
        subject: 'math',
        description: 'test',
        modules: [
          {
            name: 'test',
            daysToComplete: 1
          },
          {
            name: 'test2',
            daysToComplete: 3
          }
        ]
      })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('group')
        res.body.group.should.be.a('object')
        res.body.group.should.have.property('name')
        res.body.group.should.have.property('inviteCode')
        res.body.group.should.have.property('members')
        res.body.group.members.should.be.a('array')
        res.body.group.should.have.property('subject')
        res.body.group.should.have.property('description')
        res.body.group.should.have.property('admin')
        res.body.group.should.have.property('modules')
        res.body.group.modules.should.be.a('array')
        res.body.group.should.have.property('_id')
        res.body.group.should.have.property('date')
        done()
      })
  })
})
