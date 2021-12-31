const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const request = require('supertest')
const { multipleBlogs, oneBlog, oneUser, getAll, postOneBlog, postMultipleBlogs } = require('./test_helpers')

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
  await postMultipleBlogs(multipleBlogs, ONEUSER_TOKEN, 201)
}, 100000)

describe('add a blog', () => {
  test('without auth, fails', async () => {
    await postOneBlog(oneBlog, '', 401)
  })

  test('with auth, succeeds', async () => {
    await postOneBlog(oneBlog, ONEUSER_TOKEN, 201)
  })
})

describe('delete a blog', () => {
  test('without auth, fails', async () => {
    const response = await postOneBlog(oneBlog, ONEUSER_TOKEN, 201)
    const newBlogId = response.body.id
    await request(app)
      .delete('/api/blogs/' + newBlogId)
      .send(newBlogId)
      .expect(401)
  })

  test('with auth, succeeds', async () => {
    const response = await postOneBlog(oneBlog, ONEUSER_TOKEN, 201)
    const newBlogId = response.body.id
    await request(app)
      .delete('/api/blogs/' + newBlogId)
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .expect(204)
  })
})

describe('GET operations', () => {
  test('can GET all in /api/blogs', async () => {
    const response = await getAll('blogs', 200)
    expect(response.body).toHaveLength(multipleBlogs.length)
  })
})

describe('POST operations', () => {
  test('can GET blog after POST', async () => {
    await postOneBlog(oneBlog, ONEUSER_TOKEN, 201)

    const response = await getAll('blogs', 200)

    expect(response.body).toHaveLength(multipleBlogs.length + 1)

    const postsWithNoID = response.body.map(p => {
      delete p.id
      delete p.user
      return p
    })

    expect(postsWithNoID).toContainEqual(oneBlog)
  }, 100000)

  test('posted objects have id property', async () => {
    const response = await getAll('blogs', 200)
    response.body.forEach(p => {
      expect(p.id).toBeDefined()
    })
  })

  test('if no like property it defaults to 0', async () => {
    const oneBlogNoLikes = { ...oneBlog }
    delete oneBlogNoLikes.likes

    const resp = await postOneBlog(oneBlogNoLikes, ONEUSER_TOKEN, 201)

    expect(resp.body.likes).toBe(0)
  })

  test('if url and title missing then error', async () => {
    const oneBlogIncomplete = { ...oneBlog }
    delete oneBlogIncomplete.url
    delete oneBlogIncomplete.title

    await postOneBlog(oneBlogIncomplete, ONEUSER_TOKEN, 400)
  })
})

describe('DELETE operations', () => {
  test('returns 404 if id doesnt exist', async () => {
    const id = '1'.repeat(24)
    await request(app)
      .delete('/api/blogs/' + id)
      .set('Authorization', 'bearer ' + ONEUSER_TOKEN)
      .expect(404)
  })
})

afterAll(async () => {
  logger.green('disconnected from db')
  await mongoose.connection.close()
})
