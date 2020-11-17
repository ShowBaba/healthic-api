/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const User = require('../models/model.user');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({
      error: 'Email is required',
    });
  }
  if (!password) {
    return res.status(400).send({
      error: 'Password is required',
    });
  }
  User.find({
    email,
  }).then((user) => {
    for (let i = 0; i < user.length; i++) {
      const obj = user[i];
      if (obj.email === email) {
        return res.status(400).send({
          error: 'Email already exist',
        });
      }
    }
    next();
  });
};
