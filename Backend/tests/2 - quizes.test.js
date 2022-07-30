/* global before, describe, it */
/* eslint handle-callback-err: "warn" */
process.env.NODE_ENV = 'test'

const { Groups, Quiz } = require('../src/api/models/Groups.model')

// dev deps
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
chai.should()

chai.use(chaiHttp)

// parent block
before(done => {
  // Drop the Groups collection at the start of this
  // test suite to ensure that we start with a clean slate
  Quiz.deleteMany({}, err => {
    if (err) {
      console.log(err.stack)
    }
    done()
  })
})

let token, token2, groupID1, groupID2
// let userID1, userID2
let QuizID1, QuizID2
/*
    * Login
*/
describe('Initial Data', () => {
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
  it('get group IDs', async () => {
    const group1 = await Groups.findOne({ name: 'test0' })
    const group2 = await Groups.findOne({ name: 'test1' })
    group1.should.have.property('id')
    group2.should.have.property('id')
    groupID1 = group1.id
    groupID2 = group2.id
  })
  // it('get User IDs', done => {
  //   chai.request(server)
  //     .get('/api/v1/user/')
  //     .set('x-access-token', token)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err.stack)
  //       }
  //       res.should.have.status(200)
  //       res.body.should.be.a('object')
  //       res.body.should.have.property('success')
  //       res.body.success.should.be.a('boolean')
  //       res.body.success.should.equal(true)
  //       res.body.should.have.property('data')
  //       res.body.data.should.be.a('object')
  //       userID1 = res.body.data._id
  //     })
  //   chai.request(server)
  //     .get('/api/v1/user/')
  //     .set('x-access-token', token2)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err.stack)
  //       }
  //       res.should.have.status(200)
  //       res.body.should.be.a('object')
  //       res.body.should.have.property('success')
  //       res.body.success.should.be.a('boolean')
  //       res.body.success.should.equal(true)
  //       res.body.should.have.property('data')
  //       userID2 = res.body.data._id
  //       done()
  //     })
  // })
})

/*
    * Test Create Quiz
*/
describe('/POST /api/v1/groups/:group/quiz/new', () => {
  it('Invalid group ID', done => {
    chai.request(server)
      .post('/api/v1/groups/123/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          }
        ]
      })
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
        res.body.error.should.equal('Invalid Group ID')
        done()
      })
  })
  it('Invalid time', done => {
    chai.request(server)
      .post('/api/v1/groups/' + groupID1 + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: 'sd',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          }
        ]
      })
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
  it('Group not found', done => {
    chai.request(server)
      .post('/api/v1/groups/' + '62cf63273c39a81d0c3784e5' + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          }
        ]
      })
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
  it('Invalid questions', done => {
    chai.request(server)
      .post('/api/v1/groups/' + groupID1 + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          },
          {
            question: 'What is the capital of the United States?'
          }
        ]
      })
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
  it('Answer not in options', done => {
    chai.request(server)
      .post('/api/v1/groups/' + groupID1 + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          },
          {
            question: 'What is the capital of the United States?',
            options: [
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          }
        ]
      })
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
        res.body.error.should.equal('Answer is not included in options')
        done()
      })
  })
  it('Success', done => {
    chai.request(server)
      .post('/api/v1/groups/' + groupID1 + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          },
          {
            question: 'What is the capital of the India?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Delhi'
            ],
            answer: 'Delhi'
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
        res.body.should.have.property('message')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('Quiz created')
        res.body.should.have.property('id')
        res.body.id.should.be.a('string')
        QuizID1 = res.body.id
        done()
      })
  })
})

/*
    * Get Quizzes
*/
describe('/GET /api/v1/groups/:group/quiz', () => {
  it('No Quiz Found for Group', done => {
    chai.request(server)
      .get('/api/v1/groups/' + groupID2 + '/quiz')
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
        res.body.error.should.equal('No quizzes in this group')
        done()
      })
  })
  it('User is not a member of the group', done => {
    chai.request(server)
      .get('/api/v1/groups/' + groupID2 + '/quiz')
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
        res.body.error.should.equal('You are not a member of this group')
        done()
      })
  })
  it('Success', done => {
    chai.request(server)
      .get('/api/v1/groups/' + groupID1 + '/quiz')
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
        res.body.data.should.be.a('array')
        res.body.data[0].should.have.property('creator')
        res.body.data[0].creator.should.have.property('id')
        res.body.data[0].creator.should.have.property('name')
        res.body.data[0].creator.name.should.be.a('string')
        res.body.data[0].should.have.property('time')
        res.body.data[0].time.should.be.a('string')
        res.body.data[0].should.have.property('questions')
        res.body.data[0].questions.should.be.a('array')
        res.body.data[0].questions[0].should.have.property('question')
        res.body.data[0].questions[0].should.have.property('options')
        res.body.data[0].questions[0].should.not.have.property('answer')
        res.body.data[0].questions[0].options.should.be.a('array')
        done()
      })
  })
})

/*
  * Get Quiz by ID
*/
describe('/Get /api/v1/groups/quiz/:id', () => {
  it('Invalid Quiz ID', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + '123')
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
        res.body.error.should.equal('Invalid Quiz ID')
        done()
      })
  })
  it('Quiz not found', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + '62cf63273c39a81d0c3784e5')
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
        res.body.error.should.equal('Quiz does not exist')
        done()
      })
  })
  it('Create a Quiz for test Purpose', done => {
    chai.request(server)
      .post('/api/v1/groups/' + groupID2 + '/quiz/new')
      .set('x-access-token', token)
      .send({
        time: '12:00',
        questions: [
          {
            question: 'What is the capital of the United States?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Atlanta'
            ],
            answer: 'Washington'
          },
          {
            question: 'capitalIndia?',
            options: [
              'Washington',
              'New York',
              'Philadelphia',
              'Delhi'
            ],
            answer: 'Delhi'
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
        res.body.should.have.property('message')
        res.body.message.should.be.a('string')
        res.body.message.should.equal('Quiz created')
        res.body.should.have.property('id')
        res.body.id.should.be.a('string')
        QuizID2 = res.body.id
        done()
      })
  })
  it('User is not a member of the group', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID2)
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
        res.body.error.should.equal('You are not a member of this group')
        done()
      })
  })
  it('Success [If User is not creator]', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID1)
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
        res.body.group.should.be.a('string')
        res.body.should.have.property('time')
        res.body.time.should.be.a('string')
        res.body.should.have.property('creator')
        res.body.creator.should.be.a('object')
        res.body.creator.should.have.property('id')
        res.body.creator.id.should.be.a('string')
        res.body.creator.should.have.property('name')
        res.body.creator.name.should.be.a('string')
        res.body.should.have.property('questions')
        res.body.questions.should.be.a('array')
        res.body.questions[0].should.have.property('question')
        res.body.questions[0].question.should.be.a('string')
        res.body.questions[0].should.have.property('options')
        res.body.questions[0].options.should.be.a('array')
        res.body.questions[0].options[0].should.be.a('string')
        res.body.questions[0].should.have.property('answer')
        res.body.questions[0].answer.should.be.a('string')
        res.body.should.have.property('attempted')
        res.body.attempted.should.be.a('array')
        done()
      })
  })
  it('Success [If User is creator]', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID1)
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
        res.body.group.should.be.a('string')
        res.body.should.have.property('time')
        res.body.time.should.be.a('string')
        res.body.should.have.property('creator')
        res.body.creator.should.be.a('object')
        res.body.creator.should.have.property('id')
        res.body.creator.id.should.be.a('string')
        res.body.creator.should.have.property('name')
        res.body.creator.name.should.be.a('string')
        res.body.should.have.property('questions')
        res.body.questions.should.be.a('array')
        res.body.questions[0].should.have.property('question')
        res.body.questions[0].question.should.be.a('string')
        res.body.questions[0].should.have.property('options')
        res.body.questions[0].options.should.be.a('array')
        res.body.questions[0].options[0].should.be.a('string')
        res.body.questions[0].should.have.property('answer')
        res.body.questions[0].answer.should.be.a('string')
        done()
      })
  })
})

/*
  * Attempt a quiz
*/
describe('/POST /api/v1/groups/quiz/attempt/:id/', () => {
  it('Invalid Quiz ID', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + '123')
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
        res.body.error.should.equal('Invalid Quiz ID')
        done()
      })
  })
  it('Quiz not found', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + '62cf63273c39a81d0c3784e5')
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
        res.body.error.should.equal('Quiz does not exist')
        done()
      })
  })
  it('User is not a member of the group', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + QuizID2)
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
        res.body.error.should.equal('You are not a member of this group')
        done()
      })
  })
  it('Invalid Schema', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + QuizID1)
      .set('x-access-token', token)
      .send({
        QuestionData: [
          {
            question: ''
          }
        ]
      })
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
  it('Question Does not Exist', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + QuizID1)
      .set('x-access-token', token)
      .send({
        QuestionData: [
          {
            question: 'What is the capital of the United?',
            answer: 'Washington'
          }
        ]
      })
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
        res.body.error.should.equal('Question does not exist')
        done()
      })
  })
  it('Answer Does not Exist', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + QuizID1)
      .set('x-access-token', token)
      .send({
        QuestionData: [
          {
            question: 'What is the capital of the United States?',
            answer: 'asdsd'
          }
        ]
      })
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
        res.body.error.should.equal('Answer does not exist')
        done()
      })
  })
  it('Successful Attempt', done => {
    chai.request(server)
      .post('/api/v1/groups/quiz/attempt/' + QuizID1)
      .set('x-access-token', token)
      .send({
        QuestionData: [
          {
            question: 'What is the capital of the United States?',
            answer: 'Washington'
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
        res.body.should.have.property('data')
        res.body.data.should.be.a('array')
        res.body.data[0].should.have.property('question')
        res.body.data[0].question.should.be.a('string')
        res.body.data[0].should.have.property('YourAnswer')
        res.body.data[0].YourAnswer.should.be.a('string')
        res.body.data[0].should.have.property('CorrectAnswer')
        res.body.data[0].CorrectAnswer.should.be.a('string')
        res.body.should.have.property('score')
        done()
      })
  })
})

/*
  * Get Score
*/

describe('GET /api/v1/groups/quiz/:id/score', () => {
  it('Invalid Quiz ID', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + '123' + '/score')
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
        res.body.error.should.equal('Invalid Quiz ID')
        done()
      })
  })
  it('Quiz not found', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + '62cf63273c39a81d0c3784e5' + '/score')
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
        res.body.error.should.equal('Quiz does not exist')
        done()
      })
  })
  it('User is not a member of the group', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID2 + '/score')
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
        res.body.error.should.equal('You are not a member of this group')
        done()
      })
  })
  it('User Not Attempted Quiz', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID2 + '/score')
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
        res.body.error.should.equal('User has not attempted this quiz')
        done()
      })
  })
  it('Success', done => {
    chai.request(server)
      .get('/api/v1/groups/quiz/' + QuizID1 + '/score')
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
        res.body.data.should.be.a('array')
        res.body.data[0].should.have.property('id')
        res.body.data[0].id.should.be.a('string')
        res.body.data[0].should.have.property('score')
        res.body.data[0].score.should.be.a('number')
        res.body.data[0].should.have.property('noOfAttempts')
        res.body.data[0].noOfAttempts.should.be.a('number')
        res.body.data[0].should.have.property('lastAttempt')
        res.body.data[0].lastAttempt.should.be.a('array')
        res.body.data[0].lastAttempt[0].should.have.property('question')
        res.body.data[0].lastAttempt[0].question.should.be.a('string')
        res.body.data[0].lastAttempt[0].should.have.property('answer')
        res.body.data[0].lastAttempt[0].answer.should.be.a('string')
        res.body.data[0].lastAttempt[0].should.have.property('correct')
        res.body.data[0].lastAttempt[0].correct.should.be.a('boolean')
        res.body.data[0].lastAttempt[0].should.have.property('_id')
        res.body.data[0].lastAttempt[0]._id.should.be.a('string')
        done()
      })
  })
})

/*
  * Delete Quiz
*/
describe('DELETE /api/v1/groups/quiz/:id', () => {
  it('Invalid Quiz ID', done => {
    chai.request(server)
      .delete('/api/v1/groups/quiz/' + '123')
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
        res.body.error.should.equal('Invalid Quiz ID')
        done()
      })
  })
  it('Quiz not found', done => {
    chai.request(server)
      .delete('/api/v1/groups/quiz/' + '62cf63273c39a81d0c3784e5')
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
        res.body.error.should.equal('Quiz does not exist')
        done()
      })
  })
  it('User not Admin', done => {
    chai.request(server)
      .delete('/api/v1/groups/quiz/' + QuizID1)
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
        res.body.error.should.equal('You are not an admin of this group')
        done()
      })
  })
  it('Success', done => {
    chai.request(server)
      .delete('/api/v1/groups/quiz/' + QuizID1)
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
        res.body.message.should.equal('Quiz Deleted')
        done()
      })
  })
})
