const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const token = require('../middleware/token')
const { AuthError, userAndBlogVerification, ValidationError } = require('../utils/verification')

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

blogsRouter.post('/', token.getUser, async (request, response) => {
  const user = request.user
  if (!user) {
    response.status(400).json({ error: 'user no longer exists' })
    return
  }
  const blog = new Blog({ ...request.body, user: user._id })
  const newBlogs = user.blogs.concat(blog._id)
  await User.findByIdAndUpdate(user._id, { blogs: newBlogs })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', token.getUser, async (request, response) => {
  const id = request.params.id
  const user = request.user
  await userAndBlogVerification(id, user)
  await Blog.findByIdAndDelete(id)
  const blogIndex = user.blogs.indexOf(id)
  const updatedBlogsArr = user.blogs
    .slice(0, blogIndex)
    .concat(user.blogs.slice(blogIndex + 1))
  await User.findByIdAndUpdate(user._id, { blogs: updatedBlogsArr })
  response.status(204).end()
})

blogsRouter.put('/:id', token.getUser, async (request, response) => {
  const id = request.params.id
  const { likes } = request.body
  if (!likes) {
    response.status(404).json({ error: 'likes was not found in request body' });
    return
  }
  const updatedBlog = await Blog.findOneAndReplace({ id }, request.body, { new: true, runValidators: true, context: 'query' })
  if (!updatedBlog) {
    throw new ValidationError('blog no longer exists')
  }
  response.json(updatedBlog)
})

module.exports = blogsRouter
