/* global before, describe, it */
/* eslint handle-callback-err: "warn" */

process.env.NODE_ENV = 'test'

const User = require('../src/api/models/User.model')

// dev deps
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const path = require('path')

chai.should()
chai.use(chaiHttp)

before(done => {
  // Drop the users collection at the start of this
  // test suite to ensure that we start with a clean slate
  User.deleteMany({}, err => {
    if (err) {
      console.log(err.stack)
    }
    done()
  })
})

/*
    * Test the SIGNUP route
*/
describe('/POST /api/v1/user/signup', () => {
  it('name not send in body', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'test',
      regno: '21BBS0162',
      major: 'csbs',
      confirm: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('"name" is required')
        done()
      })
  })
  it('email not send in body', (done) => {
    const user = {
      name: 'test',
      password: 'test',
      major: 'csbs',
      regno: '21BBS0162',
      confirm: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('"email" is required')
        done()
      })
  })
  it('password not send in body', (done) => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      major: 'csbs',
      regno: '21BBS0162',
      confirm: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('"password" is required')
        done()
      })
  })
  it('confirm not send in body', (done) => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      regno: '21BBS0162',
      major: 'csbs',
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('"confirm" is required')
        done()
      })
  })
  it('confirm is not equal to password', (done) => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      regno: '21BBS0162',
      major: 'csbs',
      password: 'test',
      confirm: 'test2'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('Passwords do not match')
        done()
      })
  })
  it('email format is wrong', (done) => {
    const user = {
      name: 'test',
      email: 'test',
      regno: '21BBS0162',
      major: 'csbs',
      password: 'test',
      confirm: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
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
        res.body.error.should.equal('"email" must be a valid email')
        done()
      })
  })
  it('Signup Successful', (done) => {
    const user = {
      name: 'test',
      email: 'studybuddycc@gmail.com',
      regno: '21BBS0162',
      major: 'csbs',
      password: 'test',
      confirm: 'test'
    }
    const user2 = {
      name: 'test',
      email: 'studybuddycc2@gmail.com',
      regno: '21BBS0156',
      major: 'csbs',
      password: 'test',
      confirm: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user2)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.message.should.equal('User created, Check email for verification')
      })
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.message.should.equal('User created, Check email for verification')
        done()
      })
  })
  it('email already exists', (done) => {
    const user = {
      name: 'test2',
      email: 'studybuddycc@gmail.com',
      regno: '21BBS0162',
      major: 'csbs',
      password: 'test2',
      confirm: 'test2'
    }
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Email already exists')
        done()
      })
  })
})

/*
    * Test for Verify route
*/
describe('/GET /api/v1/user/verify/:id/:hash', () => {
  it('id is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/user/verify/123/123')
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
        res.body.error.should.equal('Invalid verification link')
        done()
      })
  })
  it('user not found', (done) => {
    chai.request(server)
      .get('/api/v1/user/verify/5d6ede6a0ba62570afcedd3a/1')
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User not found')
        done()
      })
  })
  it('hash is not valid', async () => {
    const user = await User.findOne({ email: 'studybuddycc@gmail.com' })
    const res = await chai.request(server)
      .get(`/api/v1/user/verify/${user._id.toString()}/1`)
    res.should.have.status(401)
    res.body.should.be.a('object')
    res.body.should.have.property('error')
    res.body.should.have.property('success')
    res.body.error.should.be.a('string')
    res.body.success.should.be.a('boolean')
    res.body.success.should.equal(false)
    res.body.error.should.equal('Hash doesn\'t match')
  })
  it('Verification Successful', async () => {
    const user = await User.findOne({ email: 'studybuddycc@gmail.com' })
    const res = await chai.request(server)
      .get(`/api/v1/user/verify/${user._id.toString()}/${user.hash}`)
    res.should.have.status(200)
  })
  it('user already verified', async () => {
    const user = await User.findOne({ email: 'studybuddycc@gmail.com' })
    const res = await chai.request(server)
      .get(`/api/v1/user/verify/${user._id.toString()}/${user.hash}`)
    res.should.have.status(200)
  })
})
let token
/*
    * Test for Login route
*/
describe('/POST /api/v1/user/login', () => {
  it('email is invalid', (done) => {
    const user = {
      email: 'test',
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
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
        res.body.error.should.equal('"email" must be a valid email')
        done()
      })
  })
  it('email not given', (done) => {
    const user = {
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
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
        res.body.error.should.equal('"email" is required')
        done()
      })
  })
  it('email not found', (done) => {
    const user = {
      email: 'bearts@bear.com',
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User does not exist')
        done()
      })
  })
  it('user is not verified', (done) => {
    const user = {
      email: 'studybuddycc2@gmail.com',
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User is not verified, Please check email')
        done()
      })
  })
  it('password is invalid', (done) => {
    const user = {
      email: 'studybuddycc@gmail.com',
      password: 'test2'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Incorrect password')
        done()
      })
  })
  it('Login Successful', (done) => {
    const user = {
      email: 'studybuddycc@gmail.com',
      password: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.should.have.property('token')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Login successful')
        token = res.body.token
        done()
      })
  })
})

/*
    * Test for Resend Email Verification route
*/
describe('/POST /api/v1/user/resend', () => {
  it('email is invalid', (done) => {
    const user = {
      email: 'test'
    }
    chai.request(server)
      .post('/api/v1/user/resend')
      .send(user)
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
        res.body.error.should.equal('"email" must be a valid email')
        done()
      })
  })
  it('email not given', (done) => {
    const user = {}
    chai.request(server)
      .post('/api/v1/user/resend')
      .send(user)
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
        res.body.error.should.equal('"email" is required')
        done()
      })
  })
  it('email not found', (done) => {
    const user = {
      email: 'test@gmail.com'
    }
    chai.request(server)
      .post('/api/v1/user/resend')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User does not exist')
        done()
      })
  })
  it('user already verified', (done) => {
    const user = {
      email: 'studybuddycc@gmail.com'
    }
    chai.request(server)
      .post('/api/v1/user/resend')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User is already verified')
        done()
      })
  })
  it('Resend Email Verification Successful', (done) => {
    const user = {
      email: 'studybuddycc2@gmail.com'
    }
    chai.request(server)
      .post('/api/v1/user/resend')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Verification Email Sent')
        done()
      })
  })
})

/*
    * Test for get User route
*/
describe('/GET /api/v1/user/', () => {
  it('no auth provided', (done) => {
    chai.request(server)
      .get('/api/v1/user/')
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('No token provided.')
        done()
      })
  })
  it('token is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/user/')
      .set('x-access-token', 'invalidtoken')
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Invalid Token')
        done()
      })
  })
  it('Success', (done) => {
    // save token to variable
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
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('email')
        res.body.data.should.have.property('name')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('isVerified')
        res.body.data.should.have.property('regno')
        res.body.data.should.have.property('avatar')
        res.body.data.should.have.property('graduatingYear')
        res.body.data.should.have.property('bio')
        res.body.data.should.have.property('createdAt')
        res.body.data.should.have.property('updatedAt')
        res.body.success.should.equal(true)
        done()
      })
  })
})

/*
    * Test for forgot Password route
*/
describe('/POST /api/v1/user/forgotPassword', () => {
  it('no email provided', (done) => {
    chai.request(server)
      .post('/api/v1/user/forgotPassword')
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
        res.body.error.should.equal('"email" is required')
        done()
      })
  })
  it('email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/user/forgotPassword')
      .send({ email: 'invalidemail@email.com' })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User not found')
        done()
      })
  })
  it('if user is not verified', (done) => {
    chai.request(server)
      .post('/api/v1/user/forgotPassword')
      .send({ email: 'studybuddycc2@gmail.com' })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('User is not verified, Resend Verification email instead?')
        done()
      })
  })
  it('Verify the other email', async () => {
    const user = await User.findOne({ email: 'studybuddycc2@gmail.com' })
    const res = await chai.request(server)
      .get(`/api/v1/user/verify/${user._id.toString()}/${user.hash}`)
    res.should.have.status(200)
  })
  it('Success', (done) => {
    chai.request(server)
      .post('/api/v1/user/forgotPassword')
      .send({ email: 'studybuddycc2@gmail.com' })
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
        res.body.message.should.equal('Check your email for reset link')
        done()
      })
  })
})

/*
    * Test for verify the link that is sent to the user for reset pass
*/
let id
let hash
describe('/GET /api/v1/user/reset/:id/:hash', () => {
  before(async () => {
    const user = await User.findOne({ email: 'studybuddycc2@gmail.com' })
    id = user._id.toString()
    hash = user.hash
  })
  it('invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/user/reset/123/123')
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
        res.body.error.should.equal('Invalid Reset Link')
        done()
      })
  })
  it('invalid hash', (done) => {
    chai.request(server)
      .get(`/api/v1/user/reset/${id}/123`)
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Invalid link')
        done()
      })
  })
  it('success', (done) => {
    chai.request(server)
      .get(`/api/v1/user/reset/${id}/${hash}`)
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
        res.body.message.should.equal('Reset link is valid')
        done()
      })
  })
})

/*
    * Test for reset password
*/
describe('/POST /api/v1/user/reset/:id/:hash', () => {
  it('invalid id', (done) => {
    chai.request(server)
      .post('/api/v1/user/reset/123/123')
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
        res.body.error.should.equal('Invalid Reset Link')
        done()
      })
  })
  it('invalid hash', (done) => {
    chai.request(server)
      .post(`/api/v1/user/reset/${id}/123`)
      .send({ password: '123', confirm: '1234' })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Invalid link')
        done()
      })
  })
  it('password does not match', (done) => {
    chai.request(server)
      .post(`/api/v1/user/reset/${id}/${hash}`)
      .send({ password: '123', confirm: '1234' })
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
        res.body.error.should.equal('Password do not match')
        done()
      })
  })
  it('success', (done) => {
    chai.request(server)
      .post(`/api/v1/user/reset/${id}/${hash}`)
      .send({ password: 'test', confirm: 'test' })
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
        res.body.message.should.equal('Password reset successful')
        done()
      })
  })
  it('login', done => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send({ email: 'studybuddycc2@gmail.com', password: 'test' })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.should.have.property('token')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Login successful')
        done()
      })
  })
})

/*
  * Test for Edit User
*/
describe('/PATCH /api/v1/user/edit', () => {
  it('no token provided', (done) => {
    chai.request(server)
      .patch('/api/v1/user/edit')
      .send({
        name: 'test'
      })
      .end((err, res) => {
        if (err) {
          console.log(err.stack)
        }
        res.should.have.status(401)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('success')
        res.body.error.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.success.should.equal(false)
        res.body.error.should.equal('No token provided.')
        done()
      })
  })
  it('Success [Name]', (done) => {
    chai.request(server)
      .patch('/api/v1/user/edit')
      .set('x-access-token', token)
      .field('Content-Type', 'multipart/form-data')
      .field('name', 'Anuj Parihar')
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
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('User updated')
        done()
      })
  })
  it('Success [Avatar]', (done) => {
    chai.request(server)
      .patch('/api/v1/user/edit')
      .set('x-access-token', token)
      .field('Content-Type', 'multipart/form-data')
      .attach('avatar', path.resolve(__dirname, 'test.png'))
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
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('User updated')
        done()
      })
  })
  it('Success [Change Pass]', (done) => {
    chai.request(server)
      .patch('/api/v1/user/edit')
      .set('x-access-token', token)
      .field('Content-Type', 'multipart/form-data')
      .field('oldPass', 'test')
      .field('newPass', 'test')
      .field('confirmPass', 'test')
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
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('Password updated')
        done()
      })
  })
})
