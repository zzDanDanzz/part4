const mongoose = require('mongoose')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

mongoose.connect(config.MONGO_URI).then(() => logger.green('connected to db'))

app.use(cors())

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
