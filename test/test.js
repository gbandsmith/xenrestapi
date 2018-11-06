var assert = require('assert');
const xen_service = require('../services/xen.service');
const xen_controller = require('../controllers/xen.controller');
var fs = require('fs');
var proc = require('child_process');
var sinon = require('sinon');

var runningVms =[
  {id: 3, name: 'bor41', ram: 16600, vcpu: 4, state: "running"},
  {id: 4, name: 'win360', ram: 2048, vcpu: 1, state: "running"}
]

var allVms =[ { name: 'sage', state: 'stopped' },
  { name: 'bor41', state: 'stopped' },
  { name: 'win360', state: 'stopped' } ]

var allFinalVms = [
  {id: 3, name: 'bor41', ram: 16600, vcpu: 4, state: "running"},
  {id: 4, name: 'win360', ram: 2048, vcpu: 1, state: "running"},
  { name: 'sage', state: 'stopped' }]

describe('services', function() {
  describe('xen.service', function() {
    it('xen.service.running', function() {
      var out = fs.readFileSync('./test/mocks/fakeOutStream', 'utf8');
      sinon.stub(proc, 'exec').callsFake(function (cmd, callback) {
        callback(null, out, null);
      });
      xen_service.runningXenInstances(function(err) {
        assert.fail(err)
      }, function(vms) {
        assert.deepStrictEqual(vms, runningVms)
      })
    });

    it('xen.service.all', function() {
      var vms = ['sage', 'bor41', 'win360']
      sinon.stub(fs, 'readdir').callsFake(function (path, callback) {
        callback(null, vms);
      });
      xen_service.allXenInstances(function(err) {
        assert.fail(err)
      }, function(items) {
        assert.deepStrictEqual(items, allVms)
      },
      [])
    });
  });
});

describe('controller', function() {
  describe('xen.controller', function() {
    it('xen.controller.list', function() {
      var req = {};
      var res = {};
      res.send = function(items) {
        assert.deepStrictEqual(items, allFinalVms)
      };
      var next = function(err) {assert.fail(err)}
      xen_controller.list(req, res, next)
    });
  });
});