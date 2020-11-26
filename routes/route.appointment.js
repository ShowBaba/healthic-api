const express = require('express');
const controller = require('../controllers/appointment.controller');

const router = express.Router();

router.route('/').post(controller.createAppointment);

module.exports = router;
