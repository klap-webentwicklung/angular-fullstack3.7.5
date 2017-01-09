'use strict';

const CoreEmailer = require('./mailer.js');
const path = require('path');
const CONFIG = require('../config/local.env');


const smtpConfig = {
  host: CONFIG.smtp.host || 'xxxxx',
  port: CONFIG.smtp.port || 465,
  secure: true, // use SSL
  auth: {
    user: CONFIG.smtp.user || 'xxxxx',
    pass: CONFIG.smtp.password || 'xxxxx'
  }
};

const HOST = CONFIG.DOMAIN || 'http://localhost';
const templateDir = path.join(__dirname, 'templates');

const config = {
  from: CONFIG.smtp.from || 'no-reply@xxxxx.com',
  templateDir: templateDir,
  nodemailerConf: smtpConfig
};

class Emailer extends CoreEmailer {
  restorePassword(to, data) {
    data.restoreLink = `${HOST}/restore?token=${data.token}`;
    console.log(data);
    return this.sendTemplate(
      to,
      'Restore password',
      'restore-password',
      data
    )
  }
}

module.exports = new Emailer(config);
