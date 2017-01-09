'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
const VerificationToken = require('./verificationToken.model');
const emailer = require('../../services/htmlEmail.service.js');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Reset password
 */
export function resetPassword(req, res, next) {
  var userId = req.user._id;
  // var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}



/**
 * Send forgot password link
 */
export function sendForgotPassword(req, res, next) {
  console.log(1);
  const email = req.body.email;

  if(!email) {
    return res.status(400).json("Missing email.");
  }

  return User.findOne({
    email: email
  })
  .then(user => {
    let verificationToken = new VerificationToken({
      userId: user._id
    });
    return verificationToken.createToken()
    .then(verificationToken => {
      // Token is stored, now send the mail
      let emailData = {
        user: {
          firstName: user.firstName,
          lastName: user.lastName
        },
        token: verificationToken.token
      };
      return emailer.restorePassword(email, emailData)
      .catch(() => Promise.reject({email: "Error in mail service.\n Please try again later."}));
    })
  })
  .then(() => res.status(200).end())
  .catch(err => res.status(500).json(err));
}


/*
 * Validates the given token and changes the password.
 *
 */
export function resetForgotPassword(req, res, next) {
  const token = req.body.token;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if(!token || !password || !confirmPassword) {
    return res.status(400).json("Missing required params.");
  }

  if(password !== confirmPassword) {
    return res.status(400).json("Passwords does not match.");
  }

  return VerificationToken.findOne({ token: token })
  .then((verificationToken) => {
    // Find the user for that token
    return User.findOne({ _id: verificationToken.userId })
    .then(user => {
      // Change the password
      user.password = password;
      return user.save()
      .then((user) => {
        verificationToken.remove();
        return user;
      });
    })
  })
  .then((user) => {
    return res.status(200).json(user);
  })
  .catch((err) => {
    return res.status(403).json("Token is incorrect or expired. Try to restore the password again");
  });
}


/**
 * update User
 */
export function updateUser(req, res, next) {
  var userId = req.user._id;
  var firstname = String(req.body.firstname);
  var name = String(req.body.name);

  return User.findById(userId).exec()
    .then(user => {
      user.firstname = firstname;
      user.name = name;
      return user.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    })
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
