const { join } = require('path')
const { Groups, Quiz } = require(join(__dirname, '..', 'models', 'Groups.model'))
const moment = require('moment')
const User = require(join(__dirname, '..', 'models', 'User.model'))

/*
    Type: GET
    Desc: Get Quiz
    Auth: Bearer Token
    Query: None
    Params: ID of the quiz
    Body: None
    Returns: Quiz Information
*/
exports.getQuiz = async (req, res) => {
  const { id } = req.params
  try {
    const quiz = await Quiz.findById(id)
    // check if user is a part of the group
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }
    const UserInGroup = await Groups.findById(quiz.group)
    if (!UserInGroup.members.toString().includes(req.user.id)) { return res.status(400).json({ message: 'You are not a member of this group' }) }
    const { group, time, creator, attempted, questions } = quiz
    // filter questions to not send the answer
    const filteredQuestions = questions.map(questions => {
      const { question, options } = questions
      return { question, options }
    })
    const attemptedData = attempted.filter(attempt => attempt.user.toString() === req.user.id)
    return res.status(200).json({ group, time, creator, questions: filteredQuestions, attempted: attemptedData })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

/*
    Type: POST
    Desc: Create a new Quiz
    Auth: Bearer Token
    Query: None
    Params: group
    Body: time (time limit of the quiz), creator (id of the creator of quiz), questions (array of question ids)
    Returns: Success
*/
exports.createQuiz = async (req, res) => {
  const { group } = req.params
  const { time, questions } = req.body
  try {
    if (!(group && time && questions)) { return res.status(400).json({ message: 'Missing required fields' }) }
    const parsedTime = moment(time, 'HH:mm:ss').format('HH:mm:ss')
    if (parsedTime === 'Invalid date') { return res.status(400).json({ message: 'Invalid time format' }) }
    const foundGroup = await Groups.findById(group)
    if (!foundGroup) { return res.status(400).json({ message: 'Group does not exist' }) }
    // check if the questions schema is valid
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].options || !questions[i].answer) { return res.status(400).json({ message: 'Invalid questions schema' }) }
      // check if options include answer
      if (questions[i].options.indexOf(questions[i].answer) === -1) { return res.status(400).json({ message: 'Answer is not included in options' }) }
    }
    const quiz = new Quiz({
      group,
      time: parsedTime,
      creator: req.user.id,
      attempted: [],
      questions
    })
    await quiz.save()
    return res.status(200).json({ message: 'Quiz created' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

/*
    Type: POST
    Desc: Attempt a quiz
    Auth: Bearer Token
    Query: None
    Params: None
    Body: quizID (id of the quiz), questions (array of question ids)
*/

exports.attemptQuiz = async (req, res) => {
  const { id } = req.params
  const { QuestionData } = req.body
  try {
    const user = await User.findById(req.user.id)
    if (!user) { return res.status(400).json({ message: 'User does not exist' }) }

    const quiz = await Quiz.findById(id)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }

    const UserInGroup = await Groups.findById(quiz.group)
    if (!UserInGroup.members.toString().includes(req.user.id)) { return res.status(400).json({ message: 'You are not a member of this group' }) }

    let correct = true
    let score = 0
    const arr = []
    const arr2 = []
    for (let i = 0; i < QuestionData.length; i++) {
      const question = quiz.questions.find(question => question.question === QuestionData[i].question)
      if (!question) { return res.status(400).json({ message: 'Question does not exist' }) }
      correct = false
      const answer = question.options.find(option => option === QuestionData[i].answer)
      if (!answer) { return res.status(400).json({ message: 'Answer does not exist' }) }
      if (question.answer === QuestionData[i].answer) {
        correct = true
        score++
      }
      // check if answer exists in quiz

      arr2.push({ question: question.question, answer: QuestionData[i].answer, correct })

      // to show to client
      arr.push({
        question: question.question,
        YourAnswer: QuestionData[i].answer,
        CorrectAnswer: question.answer
      })
    }

    // search for the quiz in the attempted array
    const attempted = quiz.attempted.filter(attempt => attempt.user.toString() === req.user.id)
    console.log(attempted)
    const index = quiz.attempted.findIndex(attempt => attempt.user.toString() === req.user.id)
    if (index === -1) {
      quiz.attempted.push({
        user: req.user.id,
        noOfAttempts: 1,
        lastAttempt: arr2,
        score
      })
    } else {
      quiz.attempted[index].score = score
      quiz.attempted[index].lastAttempt = arr2
      quiz.attempted[index].noOfAttempts = quiz.attempted[index].noOfAttempts + 1
    }

    await quiz.save()
    return res.status(200).json({ arr, score })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}/*
    Type: GET
    Desc: Get Quiz Score and Attempts By User
    Query: None
    Params: quizID
    Body: None
    Returns: Quiz Attempts by User
*/
exports.getQuizScore = async (req, res) => {
  const { id } = req.params
  try {
    const quiz = await Quiz.findById(id)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }

    const UserInGroup = await Groups.findById(quiz.group)
    if (!UserInGroup.members.toString().includes(req.user.id)) { return res.status(400).json({ message: 'You are not a member of this group' }) }

    const attempts = quiz.attempted
    const arr = []
    let found = true
    for (let i = 0; i < attempts.length; i++) {
      // find if req.user.id is in the attempted array
      if (attempts[i].user.toString() === req.user.id) {
        const { user: id, noOfAttempts, lastAttempt, score } = attempts[i]
        arr.push({
          id,
          noOfAttempts,
          lastAttempt,
          score
        })
        break
      } else {
        found = false
      }
    }
    if (!found) { return res.status(400).json({ message: 'User has not attempted this quiz' }) }
    return res.status(200).json({ arr })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

/*
  Type: DELETE
  Desc: To Delete A Particular Quiz
  Auth: Bearer Token
  Query: None
  Params: quizID
  Body: None
  Return: Success Message
*/

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params
  try {
    const quiz = await Quiz.findById(id)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }

    const Group = await Groups.findById(quiz.group)
    // check if user is admin
    if (Group.admin.toString() !== req.user.id) { return res.status(400).json({ message: 'You are not an admin of this group' }) }
    await quiz.remove()
    return res.status(200).json({ message: 'Quiz Deleted' })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

exports.getQuizzes = async (req, res) => {
  const { group } = req.params
  try {
    const groupQuizzes = await Quiz.find({ group })
    if (!groupQuizzes) { return res.status(400).json({ message: 'No quizzes in this group' }) }
    const UserInGroup = await Groups.findById(group)
    if (!UserInGroup.members.toString().includes(req.user.id)) { return res.status(400).json({ message: 'You are not a member of this group' }) }
    const arr = []
    for (let i = 0; i < groupQuizzes.length; i++) {
      const { _id, creator, time, questions } = groupQuizzes[i]
      // filter question to not show answer
      const questions2 = questions.map(questions => {
        const { question, options } = questions
        return { question, options }
      })
      arr.push({ _id, creator, time, questions: questions2 })
    }
    return res.status(200).json({ arr })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

// Route Removed since Quizes are globalized instead of local module based
// /*
//     Type: GET
//     Desc: Get Quiz By Module Name
//     Auth: Bearer Token
//     Query: None
//     Params: groupID/moduleName
//     Body: None
//     Returns: Quiz Information
// */
// exports.getQuizByModule = async (req, res) => {
//     const { groupID, moduleName } = req.params
//     try {
//         let group = await Groups.findById(groupID)
//         if (!group)
//             return res.status(400).json({ message: 'Group does not exist' })
//         let module = group.modules.find(module => module.name === moduleName)
//         if (!module)
//             return res.status(400).json({ message: 'Module does not exist' })
//         let quizzes = module.quizzes
//         // dont show all data
//         let arr = []
//         for (let i = 0; i < quizzes.length; i++) {
//             let quiz = await Quiz.findById(quizzes[i])
//             // dont show answers of quiz
//             for (let j = 0; j < quiz.questions.length; j++) {
//                 quiz.questions[j].answer = undefined
//             }
//             let { group, time, creator, questions, date, ...data } = quiz
//         }
//         return res.status(200).json({ quizzes: arr })
//     } catch (err) {
//         return res.status(500).json({ message: "Some Internal Error Occured" })
//     }
// }
