

'use strict';

import _ from 'lodash';
import crypto from 'crypto';
import mongoose from 'mongoose';

var nodemailer = require('nodemailer');
var async = require('async');
var User = mongoose.model('User');

var transporter = nodemailer.createTransport( {
    service:  'Mailgun',
    auth: {
     user: 'postmaster@mg.klap-webdevelopment.com',
     pass: 'c47b92e00604c6be9276601983d1bf02'   
    }
});

// Send E-Mail
export function forgot(req, res, next) {

  var data = req.body;

  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res.status(400).send({
              message: 'No account with that email has been found'
          });
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {

      var mailOpts = {
        from: 'test@mg.klap-webdevelopment.com',
        to: user.email,
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/api/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      transporter.sendMail(mailOpts, function (err, response) {
          if (err) {
            console.log(err);
            return res.status(404).send({message: JSON.stringify(err)});

          } else {
            console.log(response);
            res.json({ message: 'An email has been sent to the provided email with further instructions.' });
            done(err, 'done');
          }
      });
      
    }
  ], function(err) {
    if (err) return next(err);
  });

}

export function validateResetToken(req, res) {
  console.log("Reset password GET from email token");
  console.log(req.params.token);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {

    if (err || !user) {
      return res.redirect('/forgotpass');
    }

    res.redirect('/resetpass/' + req.params.token);
  });
}

export function resetPassword(req, res, next) {

  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.'
          });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.login(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {

      var mailOpts = {
        from: 'test@mg.klap-webdevelopment.com',
        to: user.email,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };

      transporter.sendMail(mailOpts, function (err, response) {
          if (err) {
            console.log(err);
            return res.status(404).send({message: JSON.stringify(err)});

          } else {
            console.log(response);
            res.json({ message: 'Success! Your password has been changed.' });
            done(err, 'done');
          }
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
}

