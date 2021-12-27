const Blog = require('../models/blog')
const app = require('../app')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const request = require('supertest')
const { multipleBlogs } = require('./test_helpers')

beforeEach(async () => {
  logger.info('running beforeEach')
  logger.info('clearing db')
  try {
    await Blog.deleteMany()
    logger.green('db cleared successfully!')
    for (const ind in multipleBlogs) {
      const blog = new Blog(multipleBlogs[ind])
      await blog.save()
      logger.green('saved entry')
    }
  } catch (err) {
    logger.red('there was an error ::: ', err.message)
  }
}, 100000)

test('GET /api/blogs', async () => {
  const retNotes = await request(app).get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /json/)
  expect(retNotes.body).toHaveLength(multipleBlogs.length)
}, 100000)


afterAll(async () => {
  logger.info('closing connection to db')
  await mongoose.connection.close()
})
