const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const MONGO_URI = config.MONGO_URI
mongoose.connect(MONGO_URI).then(res => console.log('connected to db'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
