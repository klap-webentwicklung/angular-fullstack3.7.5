import mongoose from 'mongoose';

const uuid = require('node-uuid');
const expirationTime = 24*60*60; //1 day

const ObjectId = mongoose.Schema.Types.ObjectId;

const VerificationTokenSchema = mongoose.Schema({
  userId: { type: ObjectId, required: true, index: true },
  token: { type: String, required: true, index: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: expirationTime}
});

VerificationTokenSchema.methods = {

  createToken() {
    let token = uuid.v4();
    this.set("token", token);
    return this.save(this);
  }

};

module.exports = mongoose.model("VerificationToken", VerificationTokenSchema);
