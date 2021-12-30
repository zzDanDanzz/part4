const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const request = require('supertest')
const { oneBlog, oneUser } = require('./test_helpers')

let ONEUSER_TOKEN = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(oneUser)
    .expect(201)
  const res = await request(app)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({ username: oneUser.username, password: oneUser.password })
    .expect(200)
  ONEUSER_TOKEN = res.body.token
}, 100000)

describe('add a blog', () => {
  test('without auth, fails', async () => {
    await request(app)
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(oneBlog)
      .expect(401)
  })

  test('with auth, succeeds', async () => {
    await request(app)
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .send(oneBlog)
      .expect(201)
  })
})

describe('delete a blog', () => {
  test('without auth, fails', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .send(oneBlog)
      .expect(201)
    const newBlogId = response.body.id
    await request(app)
      .delete('/api/blogs')
      .send(newBlogId)
      .expect(401)
  })

  test('with auth, succeeds', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .send(oneBlog)
      .expect(201)
    const newBlogId = response.body.id
    await request(app)
      .delete('/api/blogs/' + newBlogId)
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .expect(204)
  })
})

afterAll(async () => {
  logger.green('disconnected from db')
  await mongoose.connection.close()
})
