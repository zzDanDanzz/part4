const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const token = require('../middleware/token')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const retBlog = await Blog.findById(id)
  if (!retBlog) response.status(404).send({ error: 'id does not exist in database' })
  response.json(retBlog)
})

blogsRouter.post('/', token.getToken, async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)

  const blog = new Blog({ ...request.body, user: decodedToken.id })
  const user = await User.findById(decodedToken.id)
  if (!user) {
    response.status(400).json({ error: 'user no longer exists' })
    return
  }
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', token.getToken, async (request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findByIdAndDelete(id)
  if (!blogToDelete) {
    response.status(404).json({ error: 'blog no longer exists' })
  } else {
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { likes } = request.body
  const updatedPost = await Blog.findByIdAndUpdate(id, { likes }, { new: true, runValidators: true, context: 'query' })
  if (!updatedPost) {
    response.status(400).json({ error: 'post does not exist' })
    return
  }
  response.json(updatedPost)
})

module.exports = blogsRouter
