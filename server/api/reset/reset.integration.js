'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newReset;

describe('Reset API:', function() {
  describe('GET /n', function() {
    var resets;

    beforeEach(function(done) {
      request(app)
        .get('/n')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          resets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(resets).to.be.instanceOf(Array);
    });
  });

  describe('POST /n', function() {
    beforeEach(function(done) {
      request(app)
        .post('/n')
        .send({
          name: 'New Reset',
          info: 'This is the brand new reset!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newReset = res.body;
          done();
        });
    });

    it('should respond with the newly created reset', function() {
      expect(newReset.name).to.equal('New Reset');
      expect(newReset.info).to.equal('This is the brand new reset!!!');
    });
  });

  describe('GET /n/:id', function() {
    var reset;

    beforeEach(function(done) {
      request(app)
        .get(`/n/${newReset._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          reset = res.body;
          done();
        });
    });

    afterEach(function() {
      reset = {};
    });

    it('should respond with the requested reset', function() {
      expect(reset.name).to.equal('New Reset');
      expect(reset.info).to.equal('This is the brand new reset!!!');
    });
  });

  describe('PUT /n/:id', function() {
    var updatedReset;

    beforeEach(function(done) {
      request(app)
        .put(`/n/${newReset._id}`)
        .send({
          name: 'Updated Reset',
          info: 'This is the updated reset!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedReset = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReset = {};
    });

    it('should respond with the updated reset', function() {
      expect(updatedReset.name).to.equal('Updated Reset');
      expect(updatedReset.info).to.equal('This is the updated reset!!!');
    });

    it('should respond with the updated reset on a subsequent GET', function(done) {
      request(app)
        .get(`/n/${newReset._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let reset = res.body;

          expect(reset.name).to.equal('Updated Reset');
          expect(reset.info).to.equal('This is the updated reset!!!');

          done();
        });
    });
  });

  describe('PATCH /n/:id', function() {
    var patchedReset;

    beforeEach(function(done) {
      request(app)
        .patch(`/n/${newReset._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Reset' },
          { op: 'replace', path: '/info', value: 'This is the patched reset!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedReset = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedReset = {};
    });

    it('should respond with the patched reset', function() {
      expect(patchedReset.name).to.equal('Patched Reset');
      expect(patchedReset.info).to.equal('This is the patched reset!!!');
    });
  });

  describe('DELETE /n/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/n/${newReset._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reset does not exist', function(done) {
      request(app)
        .delete(`/n/${newReset._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
