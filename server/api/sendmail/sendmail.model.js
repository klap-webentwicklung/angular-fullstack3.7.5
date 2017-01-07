'use strict';

import mongoose from 'mongoose';

var SendmailSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Sendmail', SendmailSchema);
