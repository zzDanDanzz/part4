const listHelper = require('../utils/list_helper')
const { multipleBlogs, zeroBlogs } = require('./test_helpers')

const oneBlog = multipleBlogs.slice(0,1)

describe('TOTAL LIKES : ', () => {
  test('of multiple blogs is the sum of their like', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(24)
  })
  test('of one blog is just the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(oneBlog[0].likes)
  })
  test('of zero blogs is zero', () => {
    const result = listHelper.totalLikes(zeroBlogs)
    expect(result).toBe(0)
  })
})

describe('FAVORITE BLOG : ', () => {
  test('of multiple blogs returns blog with most likes', () => {
    const expectedValue = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(expectedValue)
  })

  test('of one blog returns the blog itself', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(oneBlog[0])
  })

  test('of zero blogs returns 0', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(0)
  })
})

describe('MOST BLOGS : ', () => {
  test('of multiple blogs returns author with most posts', () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', posts: 2 })
  })
  test('of one blog returns author of that blog', () => {
    const result = listHelper.mostBlogs(oneBlog)
    const { author } = oneBlog[0]
    expect(result).toEqual({ author, posts: 1 })
  })
})

describe('MOST LIKES : ', () => {
  test('of multiple blogs returns author with most likes', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('of one blog returns author of that blog', () => {
    const result = listHelper.mostLikes(oneBlog)
    const { author, likes } = oneBlog[0]
    expect(result).toEqual({ author, likes })
  })
})
