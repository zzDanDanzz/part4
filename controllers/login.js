const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { ValidationError } = require('../utils/verification')
const SECRET = require('../utils/config').SECRET
const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user) {
    if (!await bcrypt.compare(password, user.pwdHash)) {
      throw new ValidationError('wrong password')
    }
  } else {
    throw new ValidationError('invalid username')
  }

  const dataToTurnIntoToken = { username: user.username, id: user._id }

  const token = jwt.sign(dataToTurnIntoToken, SECRET)

  res.json({ token, username, id: user._id })
})

module.exports = loginRouter