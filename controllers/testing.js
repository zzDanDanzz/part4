const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async () => {
  await Blog.deleteMany()
  await User.deleteMany()

  module.exports = testingRouter
})