'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://@cockney.5.mongolayer.com:10006,cockney.4.mongolayer.com:10006/afs375?replicaSet=set-56422798564f1bcc1e0004fc'
    uri: 'mongodb://localhost/weindb-dev'
  },

  // Seed database on startup
  seedDB: true

};
