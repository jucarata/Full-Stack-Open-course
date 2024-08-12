require("dotenv").config()
const logger = require('./logger')
const jwt = require("jsonwebtoken")


const requestLogger = (request, response, next) => {
  logger.printInfo('Method:', request.method)
  logger.printInfo('Path:  ', request.path)
  logger.printInfo('Body:  ', request.body)
  logger.printInfo('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: 'expected `username` to be unique'})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'invalid token'})
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({error: 'token expired'})
  } else if (error.name === 'ContentMissingError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === "InvalidPasswordError") {
    return response.status(400).json({error: error.message})
  }

  next(error)
}



const protectedRoute = (request, response, next) => {
  const authorization = getToken(request)

  if(authorization){
    const token = authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {return response.status(401).json({ error: 'token invalid' })}
    request.user = decodedToken

    next() //Give the controll for next middleware
  } else {return response.status(401).json({ error: 'unauthorized: token missing' })}
}

const getToken = (request, response) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith("Bearer ")){
    return authorization
  } else {return false}
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  protectedRoute
}