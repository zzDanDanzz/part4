const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passwordVerification = require('../utils/verification')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author:1, id: 1})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  passwordVerification(password)
  const pwdHash = await bcrypt.hash(password, 10)
  const user = User({ username, name, pwdHash })
  const savedUser = await user.save()
  if (savedUser) response.status(201).json(savedUser)
})

module.exports = usersRouter
