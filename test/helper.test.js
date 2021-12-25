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
  test('of zero blogs is zero', () => {
    const result = listHelper.totalLikes(zeroBlogs)
    expect(result).toBe(0)
  })
  test('of one blog is just the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(oneBlog[0].likes)
  })


})
