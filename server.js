require("dotenv").config();
var express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),    
    helmet = require('helmet'),
    compress = require('compression'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    ApiRoutes = require('./routes');

    // Normal express config middlewares
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(bodyParser.urlencoded({extended:false}));

app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://formfrontend.netlify.app"
      ],
      credentials: true,
    })
  );

// Custom api routes
app.use('/', ApiRoutes);

/** connect to MongoDB datastore */
mongoose.connect( config.DB.uri, config.DB.options)
    .then(()=>{
        console.log(chalk.green.bold('Server successfully connected with MongoDB!'));
        app.listen(config.PORT, function(){
            console.log('Listening on port ' + config.PORT);
            mongoose.set('debug', config.DB.debug);
        });
    })