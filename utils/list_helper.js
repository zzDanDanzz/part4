
const totalLikes = (blogs) => {
  const result = blogs.reduce((a, b) => a + b.likes, 0)
  return result
}

module.exports = { totalLikes }
