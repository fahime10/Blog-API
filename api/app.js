const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const User = require('./models/userModel');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

const indexRouter = require('./routes/indexRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async(username, password, done) => {
      try {
          const user = await User.findOne({ username: username });
          if (!user) {
              return done(null, false, { message: 'Incorrect details' });
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
              return done(null, false, { message: 'Incorrect details' });
          }

          return done(null, user);
      } catch(err) {
          return done(err);
      }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
