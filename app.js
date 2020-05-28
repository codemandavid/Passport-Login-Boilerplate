var createError = require('http-errors');
var express = require('express');
var path = require('path');
var router = express.Router();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
  const flash = require ('express-flash'); 



var routes = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized: false, resave:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});


app.use ('/', routes)


//  app.use('/contact',contactRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
