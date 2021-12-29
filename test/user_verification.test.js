const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const request = require('supertest')
const { oneUser } = require('./test_helpers')

beforeEach(async () => {
  await User.deleteMany()
}, 100000)

describe('creating new user', () => {
  describe('password is', () => {
    test('valid, works', async () => {
      await request(app).post('/api/users')
        .expect('Content-Type', /json/)
        .send(oneUser)
        .expect(201)

      const allUsers = await User.find()

      const allUsersNoId = JSON.parse(JSON.stringify(allUsers)).map(u => {
        delete u.id
        return u
      })

      const oneUserWithoutPass = { ...oneUser }
      delete oneUserWithoutPass.password

      expect(allUsersNoId).toContainEqual(oneUserWithoutPass)
    }, 100000)

    test('missing, fails', async () => {
      const oneUserNoPass = { ...oneUser }
      delete oneUserNoPass.password

      const response = await request(app).post('/api/users')
        .expect('Content-Type', /json/)
        .send(oneUserNoPass)
        .expect(400)

      expect(response.body.error).toBeDefined()
      expect(response.body.error).toMatch(/required/)
    }, 100000)

    test('too short, fails', async () => {
      const oneUserShortPass = { ...oneUser }
      oneUserShortPass.password = '12'

      const response = await request(app).post('/api/users')
        .expect('Content-Type', /json/)
        .send(oneUserShortPass)
        .expect(400)

      expect(response.body.error).toBeDefined()
      expect(response.body.error).toMatch(/too short/)
    }, 100000)

    test('is not String, fails', async () => {
      const oneUserNumPass = { ...oneUser }
      oneUserNumPass.password = 123123

      const response = await request(app).post('/api/users')
        .expect('Content-Type', /json/)
        .send(oneUserNumPass)
        .expect(400)

      expect(response.body.error).toBeDefined()
      expect(response.body.error).toMatch(/string type/)
    }, 100000)
  })
})

afterAll(async () => {
  logger.info('closing connection to db')
  await mongoose.connection.close()
})
