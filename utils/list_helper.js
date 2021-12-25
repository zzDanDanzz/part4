
// Receives array of blog objects and returns the sum of all their likes
const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

// Receives array of blog objects and returns the blog with the most likes (if multiple top blogs have the same number of likes, its randomly returns one of them)
const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((a, b) => a.likes > b.likes ? a : b , {likes: 0})
};


module.exports = { totalLikes, favoriteBlog }
