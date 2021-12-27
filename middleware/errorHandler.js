const logger = require('../utils/logger')


function errorHandler(error, request, response, next) {
  // only manually handling one type of error
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id format' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  logger.red(error.message)

  // the others go to express's error handler(s)
  next(error);
}

module.exports = errorHandler