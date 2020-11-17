/* eslint-disable no-shadow */
const passport = require('passport');
const User = require('../models/model.user');
const { tokenBlacklist } = require('../models/tokenBlacklist');

const { hashPassword, jwtToken, comparePassword } = require('../utils');

exports.signup = async (req, res, next) => {
  try {
    const {
      firstname, lastname, email, password
    } = req.body;
    const hash = hashPassword(password);
    const user = await User.create({
      firstname, lastname, email, password: hash
    });
    const { id } = user;
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      message: 'Registration Successful!',
      user: {
        id, firstname, lastname, email
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    console.log(user.length)
    if (user.length !== 0 && comparePassword(password, user[0].password)) {
      const token = jwtToken.createToken(user);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        message: 'Login Succesfully',
        token,
      });
    } else {
      res.statusCode = 400;
      res.send('Invalide Email/Password');
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  delete req.session;
  req.logOut();
  return res.redirect('/');
};
