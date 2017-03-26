module.exports = {
  'secret': 'thisIsQuiteExciting',
  'port': process.env.PORT || 8000,
  'database': process.env.MONGO_URL || 'mongodb://localhost/test'
}