/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema({
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('token', Token);
