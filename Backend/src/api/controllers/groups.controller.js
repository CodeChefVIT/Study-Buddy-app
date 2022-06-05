const { join } = require('path')
const Groups = require(join(__dirname, '..', 'models', 'Groups.model'))
const Subject = require(join(__dirname, '..', 'models', 'Subjects.model'))
const User = require(join(__dirname, '..', 'models', 'User.model'))
const RandExp = require('randexp')

exports.getAllGroups = async (req, res) => { // Get all groups based upon Subject if Specified
  const { subjectID } = req.query
  const limit = parseInt(req.query.limit) || 10
  const page = parseInt(req.query.page) || 1
  try {
    // subject
    // name
    // description
    // invite code
    // requests length
    // members length
    //
    // add a filter system to search for groups using subject
    let groups
    if (subjectID) {
      groups = await Groups.find({ subject: subjectID }).limit(limit).skip(limit * (page - 1))
    } else {
      groups = await Groups.find().limit(limit).skip(limit * (page - 1))
    }
    // hide requests
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].admin.toString() === req.user.id) {
        groups[i].isAdmin = true
      } else {
        groups[i].isAdmin = false
        groups[i].requests = undefined
      }
    }
    return res.status(200).json({
      groups
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.requestGroup = async (req, res) => { // request to get added to the group (based upon invite code)
  const { inviteCode } = req.query

  try {
    // add user to requests array
    const group = await Groups.findOne({ inviteCode })
    if (!group) {
      return res.status(400).json({
        message: 'Group does not exist'
      })
    }
    const user = await User.findById(req.user.id)
    if (group.members.includes(user._id)) {
      return res.status(400).json({
        message: 'User already in group'
      })
    }
    if (group.requests.includes(user._id)) {
      return res.status(400).json({
        message: 'User already requested to join group'
      })
    }
    group.requests.push(user._id)
    await group.save()
    return res.status(200).json({
      message: 'Request sent'
    })
    // to do send email to admin
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.getUserGroups = async (req, res) => {
  const id = req.query.id || req.user.id
  try {
    const groups = await Groups.find({ members: id })
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].admin.toString() === id) {
        if (req.query.id) groups[i].requests = undefined
        groups[i].isAdmin = true
      } else {
        groups[i].isAdmin = false
        groups[i].requests = undefined
      }
    }
    return res.status(200).json({
      groups
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.createGroup = async (req, res) => {
  const { name, description, subjectID } = req.body
  try {
    // invite code in the format: xxx-xxx-xxx
    // create random code from 3-3-3
    const inviteCode = new RandExp(/^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/).gen()
    const subject = await Subject.findById(subjectID)
    if (!subject) {
      return res.status(400).json({
        message: 'Subject does not exist'
      })
    }
    const group = new Groups({
      name,
      description,
      inviteCode,
      subject: subjectID,
      admin: req.user.id,
      members: [req.user.id],
      requests: []
    })
    await group.save()
    subject.groups.push(group._id)
    await subject.save()
    return res.status(200).json({
      group
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.getGroup = async (req, res) => {
  try {
    const group = await Groups.findById(req.params.id)
    if (!group) {
      return res.status(400).json({
        message: 'Group does not exist'
      })
    }
    // check for admin
    if (group.admin.toString() === req.user.id) {
      group.isAdmin = true
    } else {
      group.isAdmin = false
      group.requests = undefined
    }
    return res.status(200).json({
      group
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.acceptRequest = async (req, res) => {
  const { group, user } = req.body
  try {
    const groupObj = await Groups.findById(group)
    if (!groupObj) {
      return res.status(400).json({
        message: 'Group does not exist'
      })
    }
    const userObj = await User.findById(user)
    if (!userObj) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    if (groupObj.members.includes(userObj._id)) {
      return res.status(400).json({
        message: 'User is already in group'
      })
    }
    if (groupObj.admin.toString() !== req.user.id) {
      return res.status(400).json({
        message: 'User is not admin'
      })
    }
    if (!groupObj.requests.includes(userObj._id)) {
      return res.status(400).json({
        message: 'User has not requested to join group'
      })
    }
    groupObj.members.push(userObj._id)
    groupObj.requests = groupObj.requests.filter(request => request.toString() !== userObj._id.toString())
    await groupObj.save()
    return res.status(200).json({
      message: 'User added to group'
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}