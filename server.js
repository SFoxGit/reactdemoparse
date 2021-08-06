var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression')
// var logger = require('morgan');

const routes = require("./controller");
const sequelize = require("./config/connection");


var app = express();

const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 3600000
  }
};

app.use(session(sess));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
