module.exports = {
  DB: {
    uri: process.env.NODE_ENV === 'Production' ? process.env.MONGODB_URI : 
    'mongodb://localhost:27017/lms-dev',
    options: {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true},
    // Enable mongoose debug mode
    debug: false
  },
  env: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
}