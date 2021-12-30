const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.post('/', async (request, response) => {
  const users = await User.find()
  const firstUser = users[0]
  const blog = new Blog({ ...request.body, user: firstUser.id })
  firstUser.blogs = firstUser.blogs.concat(blog._id)
  await firstUser.save()
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  if (!await Blog.findByIdAndDelete(id)) {
    response.status(404).end()
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
