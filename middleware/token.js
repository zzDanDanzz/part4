const { AuthError } = require('../utils/verification')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getToken = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (authHeader && authHeader.includes('bearer ')) {
    req.token = authHeader.substring(7)
    next()
  } else {
    throw new AuthError('token missing or invalid')
  }
}

const getUser = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.SECRET)
  req.user = decodedToken.username
  next()
}

module.exports = { getToken, getUser }
