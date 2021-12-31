const app = require('../app')
const logger = require('../utils/logger')
const request = require('supertest')

const multipleBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

const zeroBlogs = []

const oneBlog =
{
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0
}

const oneUser = {
  username: 'daniboi',
  name: 'Dan The Dude',
  password: '123123'
}

const getAll = async (thing, code) => {
  return await request(app).get(`/api/${thing}`)
    .expect(code)
    .expect('Content-Type', /json/)
}

const postMultipleBlogs = async (blogs, token, code) => {
  for (const b of blogs) {
    await postOneBlog(b, token, code)
  }
}

const postOneBlog = async (blog, token, code) => {
  const res = await request(app)
    .post('/api/blogs')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + token)
    .send(blog)
    .expect(code)
  return res
}

module.exports = { multipleBlogs, zeroBlogs, oneBlog, oneUser, getAll, postMultipleBlogs, postOneBlog }
