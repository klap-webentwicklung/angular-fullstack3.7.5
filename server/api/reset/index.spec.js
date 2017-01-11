'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var resetCtrlStub = {
  index: 'resetCtrl.index',
  show: 'resetCtrl.show',
  create: 'resetCtrl.create',
  upsert: 'resetCtrl.upsert',
  patch: 'resetCtrl.patch',
  destroy: 'resetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var resetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './reset.controller': resetCtrlStub
});

describe('Reset API Router:', function() {
  it('should return an express router instance', function() {
    expect(resetIndex).to.equal(routerStub);
  });

  describe('GET /n', function() {
    it('should route to reset.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'resetCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /n/:id', function() {
    it('should route to reset.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'resetCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /n', function() {
    it('should route to reset.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'resetCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /n/:id', function() {
    it('should route to reset.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'resetCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /n/:id', function() {
    it('should route to reset.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'resetCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /n/:id', function() {
    it('should route to reset.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'resetCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
