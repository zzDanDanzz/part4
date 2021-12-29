// new errors
class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

// password verification
function passwordVerification (password) {
  if (!password) {
    throw new ValidationError('password is required')
  } else if (password.length < 3) {
    throw new ValidationError('password is too short (must be at least 3 chars long)')
  } else if (!(typeof password === 'string')) {
    throw new ValidationError('password must be of string type')
  }
}

module.exports = passwordVerification
