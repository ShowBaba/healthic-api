/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/model.user');

const tokenBlacklist = require('../models/tokenBlacklist');

dotenv.config();

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      error: 'You are not authorized to access this resource',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  // check if a token is in the black list db
  try {
    const result = await tokenBlacklist.find({ token });
    if (result.length !== 0) {
      return res.status(401).send({
        error: 'User already logged out of session',
      });
    }

    jwt.verify(
      token,
      process.env.secretKey,
      { expiresIn: 86400 }, // expires in 1hr
      (err) => {
        if (err) {
          return res.sendStatus(401);
        }
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};
