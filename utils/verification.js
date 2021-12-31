const Blog = require('../models/blog')

// new errors
class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class AuthError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AuthError'
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

async function userVerification (blogID, user) {
  const blog = await Blog.findById(blogID)
  if (JSON.stringify(blog.user) !== JSON.stringify(user._id)) {
    throw new AuthError('not authorized')
  }
}

module.exports = { passwordVerification, userVerification, ValidationError, AuthError }
