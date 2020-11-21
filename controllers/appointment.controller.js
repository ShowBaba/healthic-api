const Appointment = require('../models/model.appointment');

exports.createAppointment = async (req, res, next) => {
  try {
    await Appointment.create(req.body);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      message: 'Appointment created',
      appointment: req.body
    });
  } catch (error) {
    next(error);
  }
};
