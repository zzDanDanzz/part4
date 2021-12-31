
describe('HTTP PUT', () => {
  test.only('likes updated successfully', async () => {
    const posts = await Blog.find()
    const id = posts[0].id
    const likes = posts[0].likes
    const response = await request(app)
      .put('/api/blogs/' + id)
      .expect('Content-Type', /json/)
      .send({ likes: likes + 1 })
      .expect(200)
    expect(response.body.likes).toBe(likes + 1)
  })
})
