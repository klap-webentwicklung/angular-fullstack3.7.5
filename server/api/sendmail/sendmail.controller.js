/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sendmails              ->  index
 * POST    /api/sendmails              ->  create
 * GET     /api/sendmails/:id          ->  show
 * PUT     /api/sendmails/:id          ->  update
 * DELETE  /api/sendmails/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Sendmail from './sendmail.model';
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
export function sendmail(req, res, next) {
// export function sendmail(req, res) {
  console.log('Hallo Node Mail an KWD Admin');

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
          'http://' + req.headers.host + '/api/reset/pwd' + token + '\n\n' +
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

// function respondWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }

// function saveUpdates(updates) {
//   return function(entity) {
//     var updated = _.merge(entity, updates);
//     return updated.save()
//       .then(updated => {
//         return updated;
//       });
//   };
// }

// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.remove()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }

// function handleEntityNotFound(res) {
//   return function(entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }

// function handleError(res, statusCode) {
//   statusCode = statusCode || 500;
//   return function(err) {
//     res.status(statusCode).send(err);
//   };
// }

// // Gets a list of Sendmails
// export function index(req, res) {
//   return Sendmail.find().exec()
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Gets a single Sendmail from the DB
// export function show(req, res) {
//   return Sendmail.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Creates a new Sendmail in the DB
// export function create(req, res) {
//   return Sendmail.create(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }

// // Updates an existing Sendmail in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   return Sendmail.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Deletes a Sendmail from the DB
// export function destroy(req, res) {
//   return Sendmail.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }
