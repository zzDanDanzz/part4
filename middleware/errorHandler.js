const logger = require('../utils/logger')

function errorHandler (error, request, response, next) {
  // only manually handling one type of error
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id format' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'AuthError') {
    return response.status(401).send({ error: error.message })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).send({ error: 'sorry, your session has expired. Log in again.' })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'token format is not valid' })
  }
  
  logger.red(error.message)

  // the others go to express's error handler(s)
  next(error)
}

module.exports = errorHandler
