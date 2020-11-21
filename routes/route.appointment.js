const express = require('express');
const controller = require('../controllers/appointment.controller');
const validateAuth = require('../middlewares/authorization');

const router = express.Router();

router.route('/').post(validateAuth, controller.createAppointment);

module.exports = router;
