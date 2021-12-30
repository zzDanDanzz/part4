const { AuthError } = require('../utils/verification')

const getTokenFrom = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (!authHeader) {
    next()
    return null
  }
  if (authHeader.includes('bearer ')) {
    req.token = authHeader.substring(7)
    next()
  } else {
    throw new AuthError('token missing or invalid')
  }
}

module.exports = getTokenFrom
