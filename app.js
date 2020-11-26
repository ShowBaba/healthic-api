const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./config');

dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const appointmentRouter = require('./routes/route.appointment');

const app = express();

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1', (req, res) => {
  res.json({ status: 'success', message: 'Welcome To Healthic API' });
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/about.html'));
});
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/services.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/signup.html'));
});
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/blog.html'));
});

app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/appointment', appointmentRouter);

// set up a wildcard route
app.get('*', (req, res) => {
  res.redirect('/index');
});

// eslint-disable-next-line no-unused-vars
const localUrl = config.mongoUrl;
const liveUrl = process.env.DB_CONNECTION;
const connect = mongoose.connect(liveUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// establish connection
connect.then(
  // eslint-disable-next-line no-unused-vars
  (db) => {
    console.log('Connected to Database');
  },
  (err) => {
    console.log(err);
  }
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
