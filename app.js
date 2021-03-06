const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./models').sequelize;
require('dotenv').config();

const indexRouter = require('./routes/index');
const songRouter = require('./routes/song');
const reviewRouter = require('./routes/review');
const statisRouter = require('./routes/statis');
const announceRouter = require('./routes/announce');
const comingRouter = require('./routes/coming');
const randomRouter = require('./routes/random');
const searchRouter = require('./routes/search');

const app = express();
sequelize.sync();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/js', express.static(__dirname, '/node_modules/bootstrap/dist/js'));
//app.use('/css', express.static(__dirname, '/node_modules/bootstrap/dist/css'));

app.use('/', indexRouter);
app.use('/song', songRouter);
app.use('/review', reviewRouter);
app.use('/recommend', statisRouter);
app.use('/announce', announceRouter);
app.use('/coming', comingRouter);
app.use('/random', randomRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  res.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
