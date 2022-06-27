const { join } = require('path')
const { Groups, Quiz } = require(join(__dirname, '..', 'models', 'Groups.model'))
const User = require(join(__dirname, '..', 'models', 'User.model'))

/*
    Type: GET
    Desc: Get Quiz
    Query: None
    Params: ID of the quiz
    Body: None
    Returns: Quiz Information
*/
exports.getQuiz = async (req, res) => {
  const { id: QuizID } = req.params
  try {
    const quiz = await Quiz.findById(QuizID)
    // check if user is a part of the group
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }
    const Isgroup = await Groups.findById(quiz.group)
    if (Isgroup.members.indexOf(req.user.id) === -1) { return res.status(400).json({ message: 'You are not a member of this group' }) }
    const { group, time, creator, questions, date, ...data } = quiz
    // filter questions to not send the answer
    const filteredQuestions = questions.map(question => {
      return {
        question: question.question,
        options: question.options
      }
    })
    return res.status(200).json({ group, time, creator, questions: filteredQuestions, date })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

/*
    Type: POST
    Desc: Create a new Quiz
    Query: None
    Params: None
    Body: group (id of the group), time (time limit of the quiz), creator (id of the creator of quiz), questions (array of question ids)
    Returns: Success
*/
exports.createQuiz = async (req, res) => {
  const { group, time, creator, questions } = req.body
  try {
    // todo: Parse Time
    if (!(group && time && creator && questions)) { return res.status(400).json({ message: 'Missing required fields' }) }
    const foundGroup = await Groups.findById(group)
    if (!foundGroup) { return res.status(400).json({ message: 'Group does not exist' }) }
    const foundUser = await User.findById(creator)
    if (!foundUser) { return res.status(400).json({ message: 'User does not exist' }) }
    // check if the questions schema is valid
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].options || !questions[i].answer) { return res.status(400).json({ message: 'Invalid questions schema' }) }
      // check if options include answer
      if (questions[i].options.indexOf(questions[i].answer) === -1) { return res.status(400).json({ message: 'Answer is not included in options' }) }
    }
    const quiz = new Quiz({
      group,
      time,
      creator,
      attempted: [],
      questions
    })
    await quiz.save()
    return res.status(200).json({ message: 'Quiz created' })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

/*
    Type: POST
    Desc: Attempt a quiz
    Query: None
    Params: None
    Body: quizID (id of the quiz), questions (array of question ids)
*/

exports.attemptQuiz = async (req, res) => {
  const { quizID, Questiondata } = req.body
  try {
    const quiz = await Quiz.findById(quizID)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }
    const UserInGroup = await Groups.findById(quiz.group)
    if (UserInGroup.members.indexOf(req.user.id) === -1) { return res.status(400).json({ message: 'You are not a member of this group' }) }
    const user = await User.findById(req.user.id)
    if (!user) { return res.status(400).json({ message: 'User does not exist' }) }
    let correct = true
    let score = 0
    const arr = []
    const arr2 = []
    for (let i = 0; i < Questiondata.length; i++) {
      const question = quiz.questions.find(question => question.question === Questiondata[i].question)
      correct = false
      if (!question) { return res.status(400).json({ message: 'Question does not exist' }) }
      if (question.answer === Questiondata[i].answer) {
        correct = true
        score++
      }
      arr2.push({ question: question.question, answer: Questiondata[i].answer, correct })

      // to show to client
      arr.push({
        question: question.question,
        YourAnswer: Questiondata[i].answer,
        CorrectAnswer: question.answer
      })
    }
    const attempted = quiz.attempted.find(attempt => attempt.user === req.user.id)
    if (attempted) {
      // todo : update attempted
      // attempted.noOfAttempts++
      // attempted.score = score
      // attempted.lastAttempt = arr2

    } else {
      quiz.attempted.push({
        user: req.user.id,
        noOfAttempts: 1,
        lastAttempt: arr2,
        score
      })
      await quiz.save()
    }
    return res.status(200).json({ arr })
  } catch (err) {
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
  const { quizID } = req.params
  try {
    const quiz = await Quiz.findById(quizID)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }
    const UserInGroup = await Groups.findById(quiz.group)
    if (UserInGroup.members.indexOf(req.user.id) === -1) { return res.status(400).json({ message: 'You are not a member of this group' }) }
    const attempts = quiz.attempted
    const arr = []
    let found = true
    for (let i = 0; i < attempts.length; i++) {
      // find if req.user.id is in the attempted array
      if (attempts[i].user === req.user.id) {
        const { user: id, noOfAttempts, lastAttempt, score, ...data } = attempts[i]
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
    Desc: Delete Quiz
    Query: None
    Params: quizID
    Body: None
    Returns: Success Message
*/

exports.deleteQuiz = async (req, res) => {
  const { quizID } = req.params
  try {
    const quiz = await Quiz.findById(quizID)
    if (!quiz) { return res.status(400).json({ message: 'Quiz does not exist' }) }
    const Group = await Groups.findById(quiz.group)
    // check if user is admin
    if (Group.admin !== req.user.id) { return res.status(400).json({ message: 'You are not an admin of this group' }) }
    await quiz.remove()
    return res.status(200).json({ message: 'Quiz Deleted' })
  } catch (err) {
    return res.status(500).json({ message: 'Some Internal Error Occured' })
  }
}

// Route Removed since Quizes are globalized instead of local module based
// /*
//     Type: GET
//     Desc: Get Quiz By Module Name
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
