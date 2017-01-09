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

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

// Send E-Mail
export function sendmail(req, res) {
// export function sendmail(req, res) {
  console.log('Hallo Node Mail an KWD Admin');

var data = req.body;

transporter.sendMail({
    from: 'marinus@klap-webdevelopment.com',
    // from: data.email,
    // to: 'star_man23@aol.com',
    to: 'admin@klap-webdevelopment.com',
    // to: 'info@ubs-fitnessclub-utogrund.ch, admin@klap-webdevelopment.com, admin@ubs-fitnessclub-utogrund.ch',
    subject: 'Test from Nodemailer',
    // subject: 'Neu-Anmeldung ' + data.firstName + data.name,
    text: 'Hi Radka this is commint from Nodemailer'
    // text: 'Hurra, ' + data.firstName + ' ' + data.name + ' hat sich bei UBS Fitnessclub neu angemeldet. Der Inhalt des Kommentar-Feldes lautet wie folgt: ' + data.kommentar
}, (error, result) => {
  if (error) return console.error(error);
  return console.log(result);
})

res.json(data);

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
