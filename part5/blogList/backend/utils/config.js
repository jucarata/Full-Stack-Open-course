require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = (process.env.NODE_ENV !== 'test')? process.env.MONGODB_URI : process.env.MONGODB_URI_TEST

module.exports = {PORT, MONGODB_URI}