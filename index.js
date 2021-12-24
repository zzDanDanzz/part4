const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blogs')

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl).then(res => console.log('connected to db'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
