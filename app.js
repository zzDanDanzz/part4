const mongoose = require('mongoose')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const errorHandler = require('./middleware/errorHandler')

const app = express()

mongoose.connect(config.MONGO_URI).then(() => logger.green('connected to db'))

app.use(cors())

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use('/login', loginRouter)

app.use(errorHandler)

module.exports = app
