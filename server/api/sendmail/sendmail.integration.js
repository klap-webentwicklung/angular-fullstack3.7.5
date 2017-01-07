'use strict';

var app = require('../..');
import request from 'supertest';

var newSendmail;

describe('Sendmail API:', function() {

  describe('GET /api/sendmails', function() {
    var sendmails;

    beforeEach(function(done) {
      request(app)
        .get('/api/sendmails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sendmails = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sendmails).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/sendmails', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sendmails')
        .send({
          name: 'New Sendmail',
          info: 'This is the brand new sendmail!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSendmail = res.body;
          done();
        });
    });

    it('should respond with the newly created sendmail', function() {
      expect(newSendmail.name).to.equal('New Sendmail');
      expect(newSendmail.info).to.equal('This is the brand new sendmail!!!');
    });

  });

  describe('GET /api/sendmails/:id', function() {
    var sendmail;

    beforeEach(function(done) {
      request(app)
        .get('/api/sendmails/' + newSendmail._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sendmail = res.body;
          done();
        });
    });

    afterEach(function() {
      sendmail = {};
    });

    it('should respond with the requested sendmail', function() {
      expect(sendmail.name).to.equal('New Sendmail');
      expect(sendmail.info).to.equal('This is the brand new sendmail!!!');
    });

  });

  describe('PUT /api/sendmails/:id', function() {
    var updatedSendmail;

    beforeEach(function(done) {
      request(app)
        .put('/api/sendmails/' + newSendmail._id)
        .send({
          name: 'Updated Sendmail',
          info: 'This is the updated sendmail!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSendmail = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSendmail = {};
    });

    it('should respond with the updated sendmail', function() {
      expect(updatedSendmail.name).to.equal('Updated Sendmail');
      expect(updatedSendmail.info).to.equal('This is the updated sendmail!!!');
    });

  });

  describe('DELETE /api/sendmails/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sendmails/' + newSendmail._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sendmail does not exist', function(done) {
      request(app)
        .delete('/api/sendmails/' + newSendmail._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
