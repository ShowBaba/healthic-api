const express = require('express');
const controller = require('../controllers/user.controller');
const validateAuth = require('../middlewares/auth');

const router = express.Router();

/* GET users listing. */
router.route('/signup').post(validateAuth, controller.signup);
router.route('/login').post(controller.login);
router.route('/logout').get(controller.logout);

module.exports = router;
