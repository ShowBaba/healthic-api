/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Appointment = new Schema({
  department: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  timeOfAvailability: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  note: {
    type: String
  }
});

module.exports = mongoose.model('appointment', Appointment);
