module.exports = {
  email: {
    service: 'services@demoleads.com',
    admin: 'prateek@demoleads.com'
  },
  clienthost: process.env.ClientHost || 'http://localhost:3000',
  DB: {
    uri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 
    'mongodb://localhost:27017/lmsdev',
    options: {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true},
    // Enable mongoose debug mode
    debug: false
  },
  env: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  smtp: {
    "type": "smtp",
    "host": "smtp.mailspons.com",
    "secure": false,
    "port": 25,
    "tls": {
        "rejectUnauthorized": false
    },
    "auth": {
        "user": "731f4c7653fb4e5ab87c",
        "pass": "ab130aa16e82471bb8973e3b08f196d5"
    }
  },
}