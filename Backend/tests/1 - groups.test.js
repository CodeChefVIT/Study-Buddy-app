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

let token, token2, groupID1, groupID2, userID1, userID2
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
  * Login and get token
*/
describe('/POST login', () => {
  it('it should login a user and return a token', done => {
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
      })
    chai.request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'studybuddycc2@gmail.com',
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
        token2 = res.body.token
        done()
      })
  })
})

/*
  * Test the Create Group route
*/
describe('/POST /api/v1/groups/new', () => {
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

/*
  * Test the GET all groups
*/
describe('GET /api/v1/groups', () => {
  before(done => {
    Groups.deleteMany({}, err => {
      if (err) {
        console.log(err.stack)
      }
      done()
    })
  })
  it('Spam the creation', done => {
    for (let i = 0; i < 10; i++) {
      chai.request(server)
        .post('/api/v1/groups/new')
        .set('x-access-token', i % 2 === 0 ? token : token2)
        .send({
          name: `test${i}`,
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
          if (i === 9) {
            done()
          }
        })
    }
  })
  it('Successful retrieval', done => {
    chai.request(server)
      .get('/api/v1/groups')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('groups')
        res.body.groups.should.be.a('array')
        res.body.groups.length.should.be.at.most(10)
        for (let i = 0; i < res.body.groups.length; i++) {
          res.body.groups[i].should.have.property('name')
          res.body.groups[i].should.have.property('description')
          res.body.groups[i].should.have.property('inviteCode')
          res.body.groups[i].should.have.property('subject')
          res.body.groups[i].should.have.property('_id')
          res.body.groups[i].should.have.property('date')
          res.body.groups[i].should.have.property('isAdmin')
          if (i % 2 === 0) {
            res.body.groups[i].isAdmin.should.equal(true)
            res.body.groups[i].should.have.property('members')
            res.body.groups[i].members.should.be.a('array')
            res.body.groups[i].should.have.property('modules')
            res.body.groups[i].modules.should.be.a('array')
            res.body.groups[i].should.have.property('admin')
            res.body.groups[i].should.have.property('requests')
            res.body.groups[i].requests.should.be.a('array')
            res.body.groups[i].should.have.property('quizes')
            res.body.groups[i].quizes.should.be.a('array')
          } else {
            res.body.groups[i].isAdmin.should.equal(false)
            res.body.groups[i].should.not.have.property('members')
            res.body.groups[i].should.not.have.property('modules')
            res.body.groups[i].should.not.have.property('admin')
            res.body.groups[i].should.not.have.property('requests')
            res.body.groups[i].should.not.have.property('quizes')
          }
        }
        done()
      })
  })
})

/*
  * Test for Request Group
*/
describe('GET /api/v1/groups/request/:inviteCode', () => {
  it('get group IDs', async () => {
    const group1 = await Groups.findOne({ name: 'test0' })
    const group2 = await Groups.findOne({ name: 'test1' })
    group1.should.have.property('id')
    group2.should.have.property('id')
    groupID1 = group1.id
    groupID2 = group2.id
  })
  it('get User IDs', done => {
    chai.request(server)
      .get('/api/v1/user/')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        userID1 = res.body.data._id
      })
    chai.request(server)
      .get('/api/v1/user/')
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        userID2 = res.body.data._id
        done()
      })
  })
  it('Invalid inviteCode Regex', done => {
    chai.request(server)
      .get('/api/v1/groups/request/2')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        done()
      })
  })
  it('Invalid inviteCode', done => {
    chai.request(server)
      .get('/api/v1/groups/request/xy2-sde-sd4')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('Group does not exist')
        done()
      })
  })
  it('Succesfull Request to a group', async () => {
    const group = await Groups.findOne({ name: 'test1' })
    const res = await chai.request(server)
      .get(`/api/v1/groups/request/${group.inviteCode}`)
      .set('x-access-token', token)
    res.should.have.status(200)
    res.body.should.be.a('object')
    res.body.should.have.property('success')
    res.body.success.should.be.a('boolean')
    res.body.success.should.equal(true)
    res.body.should.have.property('message')
    res.body.message.should.be.a('string')
    res.body.message.should.equal('Request sent')
  })
  it('Succesfull Request to a group from other user', async () => {
    const group = await Groups.findOne({ name: 'test0' })
    const res = await chai.request(server)
      .get(`/api/v1/groups/request/${group.inviteCode}`)
      .set('x-access-token', token2)
    res.should.have.status(200)
    res.body.should.be.a('object')
    res.body.should.have.property('success')
    res.body.success.should.be.a('boolean')
    res.body.success.should.equal(true)
    res.body.should.have.property('message')
    res.body.message.should.be.a('string')
    res.body.message.should.equal('Request sent')
  })
  it('User Already in Group', async () => {
    const group = await Groups.findOne({ name: 'test0' })
    const res = await chai.request(server)
      .get(`/api/v1/groups/request/${group.inviteCode}`)
      .set('x-access-token', token)
    res.should.have.status(409)
    res.body.should.be.a('object')
    res.body.should.have.property('success')
    res.body.success.should.be.a('boolean')
    res.body.success.should.equal(false)
    res.body.should.have.property('error')
    res.body.error.should.be.a('string')
    res.body.error.should.equal('User already in group')
  })
  it('User Already requested to join group', async () => {
    const group = await Groups.findOne({ name: 'test1' })
    const res = await chai.request(server)
      .get(`/api/v1/groups/request/${group.inviteCode}`)
      .set('x-access-token', token)
    res.should.have.status(409)
    res.body.should.be.a('object')
    res.body.should.have.property('success')
    res.body.success.should.be.a('boolean')
    res.body.success.should.equal(false)
    res.body.should.have.property('error')
    res.body.error.should.be.a('string')
    res.body.error.should.equal('User already requested to join group')
  })
})

/*
  * Test for Viewing Requests for a Group
*/
describe('/GET /api/v1/groups/:group/request', () => {
  it('User is Not Admin', done => {
    chai.request(server)
      .get(`/api/v1/groups/${groupID1}/request`)
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User is not admin')
        done()
      })
  })
  it('User is Admin', done => {
    chai.request(server)
      .get(`/api/v1/groups/${groupID1}/request`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('requests')
        res.body.requests.should.be.a('array')
        res.body.requests[0].should.have.property('id')
        res.body.requests[0].id.should.be.a('string')
        res.body.requests[0].should.have.property('user')
        res.body.requests[0].user.should.be.a('string')
        res.body.requests[0].should.have.property('regno')
        res.body.requests[0].regno.should.be.a('string')
        done()
      })
  })
  it('Group does not exist', done => {
    chai.request(server)
      .get('/api/v1/groups/4edd40c86762e0fb12000003/request')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('Group does not exist')
        done()
      })
  })
})

/*
  * Test for Accepting Requests for a Group
*/
describe('/GET /api/v1/groups/request/accept/:group/:user', () => {
  it('Group does not exists', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/accept/62cf54378d72b6fa2241fdc8/${userID2}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('Group does not exist')
        done()
      })
  })
  it('User does not exist', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/accept/${groupID1}/4edd40c86762e0fb12000003`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User does not exist')
        done()
      })
  })
  it('User is not admin', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/accept/${groupID1}/${userID2}`)
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User is not admin')
        done()
      })
  })
  it('User already a member', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/accept/${groupID1}/${userID1}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User is already in group')
        done()
      })
  })
  // it('User did not request to join', done => {
  //   chai.request(server)
  //     .post(`/api/v1/groups/request/${groupID1}/${userID3}`)
  //     .set('x-access-token', token)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err.stack)
  //       }
  //       res.should.have.status(409)
  //       res.body.should.be.a('object')
  //       res.body.should.have.property('success')
  //       res.body.success.should.be.a('boolean')
  //       res.body.success.should.equal(false)
  //       res.body.should.have.property('error')
  //       res.body.error.should.be.a('string')
  //       res.body.error.should.equal('User did not request to join')
  //       done()
  //     })
  // })
  it('Success', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/accept/${groupID1}/${userID2}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('message')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('User added to group')
        done()
      })
  })
})

/*
  * Test for Rejecting Requests for a Group
*/
describe('/GET /api/v1/groups/request/reject/:group/:user', () => {
  it('Group does not exists', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/reject/62cf54378d72b6fa2241fdc8/${userID1}`)
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('Group does not exist')
        done()
      })
  })
  it('User does not exist', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/reject/${groupID1}/4edd40c86762e0fb12000003`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User does not exist')
        done()
      })
  })
  it('User is not admin', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/reject/${groupID2}/${userID1}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('User is not admin')
        done()
      })
  })
  it('Success', done => {
    chai.request(server)
      .get(`/api/v1/groups/request/reject/${groupID2}/${userID1}`)
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.should.have.property('message')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('User request deleted')
        done()
      })
  })
})

/*
  * Test for Getting a Single Group Info
*/
describe('/GET /api/v1/groups/:group', () => {
  it('Group does not exists', done => {
    chai.request(server)
      .get('/api/v1/groups/62cf54378d72b6fa2241fdc8/')
      .set('x-access-token', token2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.should.have.property('error')
        res.body.error.should.be.a('string')
        res.body.error.should.equal('Group does not exist')
        done()
      })
  })
  it('User is a group member', done => {
    chai.request(server)
      .get(`/api/v1/groups/${groupID1}/`)
      .set('x-access-token', token2)
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
        res.body.group.name.should.be.a('string')
        res.body.group.should.have.property('description')
        res.body.group.description.should.be.a('string')
        res.body.group.should.have.property('inviteCode')
        res.body.group.inviteCode.should.be.a('string')
        res.body.group.should.have.property('admin')
        res.body.group.admin.should.be.a('object')
        res.body.group.admin.should.have.property('id')
        res.body.group.admin.id.should.be.a('string')
        res.body.group.admin.should.have.property('name')
        res.body.group.admin.name.should.be.a('string')
        res.body.group.should.have.property('members')
        res.body.group.should.not.have.property('requests')
        res.body.group.members.should.be.a('array')
        res.body.group.members[0].should.be.a('object')
        res.body.group.members[0].should.have.property('id')
        res.body.group.members[0].id.should.be.a('string')
        res.body.group.members[0].should.have.property('name')
        res.body.group.members[0].name.should.be.a('string')
        res.body.group.members[0].should.have.property('major')
        res.body.group.members[0].major.should.be.a('string')
        res.body.group.members[0].should.have.property('regno')
        res.body.group.members[0].regno.should.be.a('string')
        res.body.group.members[0].should.have.property('avatar')
        res.body.group.members[0].avatar.should.be.a('string')
        res.body.group.should.have.property('subject')
        res.body.group.subject.should.be.a('string')
        res.body.group.should.have.property('quizes')
        res.body.group.quizes.should.be.a('array')
        res.body.group.should.have.property('modules')
        res.body.group.modules.should.be.a('array')
        res.body.group.should.have.property('isAdmin')
        res.body.group.isAdmin.should.be.a('boolean')
        res.body.group.isAdmin.should.equal(false)
        done()
      })
  })
  it('User is not a group member', done => {
    chai.request(server)
      .get(`/api/v1/groups/${groupID2}/`)
      .set('x-access-token', token)
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
        res.body.group.name.should.be.a('string')
        res.body.group.should.have.property('description')
        res.body.group.description.should.be.a('string')
        res.body.group.should.have.property('inviteCode')
        res.body.group.inviteCode.should.be.a('string')
        res.body.group.should.have.property('admin')
        res.body.group.admin.should.be.a('object')
        res.body.group.admin.should.have.property('id')
        res.body.group.admin.should.have.property('name')
        res.body.group.should.not.have.property('members')
        res.body.group.should.not.have.property('quizes')
        res.body.group.should.not.have.property('modules')
        res.body.group.should.have.property('subject')
        res.body.group.subject.should.be.a('string')
        res.body.group.should.have.property('isAdmin')
        res.body.group.isAdmin.should.be.a('boolean')
        res.body.group.isAdmin.should.equal(false)
        done()
      })
  })
  it('User is group admin', done => {
    chai.request(server)
      .get(`/api/v1/groups/${groupID1}/`)
      .set('x-access-token', token)
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
        res.body.group.name.should.be.a('string')
        res.body.group.should.have.property('description')
        res.body.group.description.should.be.a('string')
        res.body.group.should.have.property('inviteCode')
        res.body.group.inviteCode.should.be.a('string')
        res.body.group.should.have.property('admin')
        res.body.group.admin.should.be.a('object')
        res.body.group.admin.should.have.property('id')
        res.body.group.admin.id.should.be.a('string')
        res.body.group.admin.should.have.property('name')
        res.body.group.admin.name.should.be.a('string')
        res.body.group.should.have.property('requests')
        res.body.group.requests.should.be.a('array')
        res.body.group.should.have.property('members')
        res.body.group.members.should.be.a('array')
        res.body.group.members[0].should.be.a('object')
        res.body.group.members[0].should.have.property('id')
        res.body.group.members[0].id.should.be.a('string')
        res.body.group.members[0].should.have.property('name')
        res.body.group.members[0].name.should.be.a('string')
        res.body.group.members[0].should.have.property('major')
        res.body.group.members[0].major.should.be.a('string')
        res.body.group.members[0].should.have.property('regno')
        res.body.group.members[0].regno.should.be.a('string')
        res.body.group.members[0].should.have.property('avatar')
        res.body.group.members[0].avatar.should.be.a('string')
        res.body.group.should.have.property('subject')
        res.body.group.subject.should.be.a('string')
        res.body.group.should.have.property('quizes')
        res.body.group.quizes.should.be.a('array')
        res.body.group.should.have.property('modules')
        res.body.group.modules.should.be.a('array')
        res.body.group.should.have.property('isAdmin')
        res.body.group.isAdmin.should.be.a('boolean')
        res.body.group.isAdmin.should.equal(true)
        done()
      })
  })
})
