'use strict';

import mongoose from 'mongoose';

var ResetSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Reset', ResetSchema);
