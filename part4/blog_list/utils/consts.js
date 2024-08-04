const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "66aef63fdefa8dd0d56000bb",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "66aef65b787578268b603c1a",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "66aef65b787578268b603c1a",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "66aef67c787578268b603c1c",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "66aef67c787578268b603c1c",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "66aef67c787578268b603c1c",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

const users = [
  {
    _id: "66aef63fdefa8dd0d56000bb",
    username: "michachan",
    passwordHash: "$2b$10$ZF9C9JAXBM5/ezAsJqVZue3mw6gqtx4Jxbl064IKO1nf65D8B1fwq",
    name: "Michael Chan",
    blogs: [], 
    __v: 0
  }, 
  {
    _id: "66aef65b787578268b603c1a",
    username: "dijkstraw",
    passwordHash: "$2b$10$ZF9C9JAXBM5/ezAsJqVZue3mw6gqtx4Jxbl064IKO1nf65D8B1fwq",
    name: "Edsger W. Dijkstra",
    blogs: [], 
    __v: 0
  },
  {
    _id: "66aef67c787578268b603c1c",
    username: "robertin",
    passwordHash: "$2b$10$ZF9C9JAXBM5/ezAsJqVZue3mw6gqtx4Jxbl064IKO1nf65D8B1fwq",
    name: "Robert C. Martin",
    blogs: [], 
    __v: 0
  },
  {
    _id: "66af0afb257673672d599422",
    username: "jucarata",
    passwordHash: "$2b$10$ZF9C9JAXBM5/ezAsJqVZue3mw6gqtx4Jxbl064IKO1nf65D8B1fwq",
    name: "Juan Camilo Ramirez Tabares",
    blogs: [],
    __v: 0
  }
]


const userForLogin = {
  username: "jucarata",
  password: "12345 isnt a good pass, you must change it"
}

module.exports = {blogs, users, userForLogin}