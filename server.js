var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression')
// var logger = require('morgan');
const fileupload = require('express-fileupload')
const routes = require("./controller");
const sequelize = require("./config/connection");
var parse = require('csv-parse')

var app = express();

const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 36000000000000000000000000
  }
};

app.use(session(sess));
app.use(fileupload());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));;
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
app.use(compression());
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Oh no')) //handle error
  }
  next() //otherwise continue
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("running server");
  });
})

module.exports = app;
