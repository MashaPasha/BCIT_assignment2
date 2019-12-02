var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var apiOrdersRouter = require('./routes/api-orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding mongoose DB

// Adding connection string and open/close connection
// let mongoUrl = 'mongodb://sinapsist:comp2912assign02@ds123454.mlab.com:23454/A01068510assign2';
let mongoUrl = 'mongodb://localhost/A01068510';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    }
});



app.use('/', indexRouter);
app.use('/api/orders', apiOrdersRouter);

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
