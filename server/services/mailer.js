'use strict';

const nodemailer = require('nodemailer');
const Promise = require('bluebird');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

const ERRORS = {
  NO_CONFIG: 'Requires props to be specified in config.',
  MISSING_REQUIRED: 'Missing required parameters.',
  MISSING_FROM: 'Missing required from parameter.',
  MISSING_TEMPLATE_DIR: 'Missing required templateDir parameter.',
  MISSING_NODEEMAILER_CONF: 'Missing required nodemailerConf parameter.',
  MISSING_TO: 'Missing required to parameter.',
  MISSING_SUBJECT: 'Missing required subject parameter.',
  MISSING_TEMPLATE_NAME: 'Missing required templateName parameter.',
};


class Emailer {
  /**
   * @param config Config object.
   * @link https://github.com/nodemailer/nodemailer
   */
  constructor(config) {
    if(!config) throw Error(ERRORS.NO_CONFIG);

    if(!config.from) throw Error(ERRORS.MISSING_FROM);
    if(!config.templateDir) throw Error(ERRORS.MISSING_FROM);
    if(!config.nodemailerConf) throw Error(ERRORS.MISSING_NODEEMAILER_CONF);

    this.from = config.from;

    this.templateDir = config.templateDir;

    this.logger = config.logger;

    this.transporter = nodemailer.createTransport(config.nodemailerConf);
  }

  sendTemplate(to, subject, templateName, templateData, opt_from) {
    if(!to) return Promise.reject(ERRORS.MISSING_TO);
    if(!subject) return Promise.reject(ERRORS.MISSING_SUBJECT);
    if(!templateName) return Promise.reject(ERRORS.MISSING_TEMPLATE_NAME);

    templateData = templateData || {};

    let mailOptions = {
      from: opt_from ? opt_from : this.from,
      to: to,
      subject: subject
    };

    return new Promise((resolve, reject) => {
      let htmlTemplate = new EmailTemplate(path.join(this.templateDir, templateName));

      htmlTemplate.render(templateData, (err, result) => {
        if(err) return reject(err);

        mailOptions.html = result.html;
        if(this.logger) {
          this.logger(mailOptions);
        }

        this.transporter.sendMail(mailOptions, (err, result) => {
          if(err) return reject(err);
          resolve(result);
        });
      });
    });
  }
}

module.exports = Emailer;
