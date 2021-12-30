const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pwdHash: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
    required: true
  }]
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      delete ret.pwdHash
    }
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
