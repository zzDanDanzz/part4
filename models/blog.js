const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)
