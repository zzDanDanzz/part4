require('dotenv').config()

const MONGO_URI = process.env.NODE_ENV === 'testing'
  ? process.env.TESTING_MONGO_URI
  : process.env.NODE_ENV === 'development'
    ? process.env.DEV_MONGO_URI
    : process.env.MONGO_URI

const PORT = process.env.PORT || 3003

const SECRET = process.env.SECRET

module.exports = {
  MONGO_URI,
  PORT,
  SECRET
}
