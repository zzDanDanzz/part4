const { AuthError } = require('../utils/verification')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const getUser = async (req, res, next) => {
  const authHeader = req.get('authorization')
  let token = ''
  if (authHeader && authHeader.includes('bearer ')) {
    token = authHeader.substring(7)
  } else {
    throw new AuthError('token missing or invalid')
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  const user = await User.findOne({ username: decodedToken.username })
  if (!user) {
    throw new AuthError('user no longer exists')
  }
  req.user = user
  next()
}

module.exports = { getUser }
