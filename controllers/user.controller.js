/* eslint-disable no-shadow */
const User = require('../models/model.user');
const tokenBlacklist = require('../models/tokenBlacklist');

const { hashPassword, jwtToken, comparePassword } = require('../utils');

exports.signup = async (req, res, next) => {
  try {
    const {
      firstname, lastname, email, password, DOB, gender
    } = req.body;
    const hash = hashPassword(password);
    const user = await User.create({
      firstname, lastname, DOB, gender, email, password: hash
    });
    const { id } = user;
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      message: 'Registration Successful!',
      user: {
        id, firstname, lastname, email, DOB, gender
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
      res.send({ message: 'Invalide Email/Password' });
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await tokenBlacklist.create({ token });
    res.json({
      status: 'success',
      message: 'User signed out',
    });
  } catch (error) {
    next(error);
  }
};
