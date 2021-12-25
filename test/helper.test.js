const listHelper = require('../utils/list_helper')

const multipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

const zeroBlogs = []

const oneBlog = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]


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
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
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
    expect(result).toEqual({author: "Edsger W. Dijkstra", posts: 2})
  })
  test('of one blog returns author of that blog', () => {
    const result = listHelper.mostBlogs(oneBlog)
    const { author } = oneBlog[0]
    expect(result).toEqual({ author, posts: 1})
  })
})