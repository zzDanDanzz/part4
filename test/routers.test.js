const Blog = require('../models/blog')
const app = require('../app')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const request = require('supertest')
const { multipleBlogs, zeroBlogs, oneBlog } = require('./test_helpers')

beforeEach(async () => {
  await Blog.deleteMany()
  for (const ind in multipleBlogs) {
    const blog = new Blog(multipleBlogs[ind])
    await blog.save()
  }
}, 100000)

describe('HTTP GET', () => {
  test('/api/blogs', async () => {
    const response = await request(app).get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(response.body).toHaveLength(multipleBlogs.length)
  }, 100000)
})

describe('HTTP POST', () => {
  test('/api/blogs', async () => {
    await request(app).post('/api/blogs')
      .expect('Content-Type', /json/)
      .send(oneBlog)
      .expect(201)

    const response = await request(app).get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveLength(multipleBlogs.length + 1)

    const postsWithNoID = response.body.map(p => {
      delete p.id
      return p
    })
    expect(postsWithNoID).toContainEqual(oneBlog)
  }, 100000)

  test('posted objects have id property', async () => {
    const response = await request(app).get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
    response.body.forEach(p => {
      expect(p.id).toBeDefined()
    })
  })

  test('if no like property it defaults to 0', async () => {
    const oneBlogNoLikes = { ...oneBlog }
    delete oneBlogNoLikes.likes

    const resp = await request(app).post('/api/blogs')
      .expect('Content-Type', /json/)
      .send(oneBlogNoLikes)
      .expect(201)

    expect(resp.body.likes).toBe(0)
  })
})

afterAll(async () => {
  logger.info('closing connection to db')
  await mongoose.connection.close()
})
