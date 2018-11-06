var assert = require('assert');
const xen_controller = require('../controllers/xen.controller');
var fs = require('fs');
var proc = require('child_process');
var sinon = require('sinon');

var allFinalVms = [
  {id: 3, name: 'bor41', ram: 16600, vcpu: 4, state: "running"},
  {id: 4, name: 'win360', ram: 2048, vcpu: 1, state: "running"},
  { name: 'sage', state: 'stopped' }]

describe('controller', function() {
  var sandbox;

  before(function() {
    sandbox = sinon.createSandbox();
    var out = fs.readFileSync('./test/mocks/fakeOutStream', 'utf8');
    sandbox.stub(proc, 'execSync').callsFake(function (cmd) {
      return(out)
    });
    var files = ['old', 'sage', 'bor41', 'win360', 'scripts', 'xend-config.sxp', 'xend-pci-permissive.sxp', 'xend-pci-quirks.sxp', 'xl.conf']
    sandbox.stub(fs, 'readdirSync').callsFake(function (path) {
      return files
    });
  });
  after(function() {
    sandbox.restore();
  });

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