
// Receives array of blog objects and returns the sum of all their likes
const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

// Receives array of blog objects and returns the blog with the most likes (if multiple top blogs have the same number of likes, its randomly returns one of them)
const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((a, b) => a.likes > b.likes ? a : b, { likes: 0 })
};

// Receives array of blogs, returns the author with the most blogs (or posts??) and the number of blogs (again, I think you meant to say 'posts')
const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map(b => b.author))]
  const posts = authors.slice().fill(0, 0, authors.length)
  blogs.forEach(b => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i] === b.author) {
        posts[i]++
        break
      }
    }
  })

  const maxPosts = Math.max(...posts)
  return { author: authors[posts.indexOf(maxPosts)], posts: maxPosts }

}

module.exports = { totalLikes, favoriteBlog, mostBlogs }
