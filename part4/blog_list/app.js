const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogs = require("./controllers/blogs")
const users = require("./controllers/users")
const login = require("./controllers/login")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.printInfo('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/blogs", middleware.protectedRoute, blogs)
app.use("/users", users)
app.use("/login", login)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app