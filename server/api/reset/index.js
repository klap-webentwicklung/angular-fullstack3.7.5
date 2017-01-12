'use strict';

var express = require('express');
var controller = require('./reset.controller');

var router = express.Router();

router.post('/forgot', controller.forgot);
router.get('/:token', controller.validateResetToken);
router.post('/:token', controller.resetPassword);

module.exports = router;
