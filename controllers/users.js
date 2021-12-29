const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passwordVerification = require('../utils/verification')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  passwordVerification(password)
  const pwdHash = await bcrypt.hash(password, 10)
  const user = User({ username, name, pwdHash })
  const savedUser = await user.save()
  if (savedUser) response.status(201).json(savedUser)
})

module.exports = usersRouter
