
var createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const aboutRouter = require('./routes/about');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const shoppingCartRouter = require('./routes/shoppingCart');
const addProductRouter = require('./routes/addProduct');

var app = express();
const port = 3000;

// database connection
const connectMongo = require("./database");
connectMongo();

app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages/products',productsRouter);
app.use('/pages/about',aboutRouter);
app.use('/pages/shoppingCart',shoppingCartRouter)
app.use('/pages/signup', signupRouter);
app.use('/pages/login', loginRouter);
app.use('/pages/addProduct',addProductRouter)

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
