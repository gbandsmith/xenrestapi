var assert = require('assert');
const xen_service = require('../services/xen.service');
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

describe('services', function() {
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

  describe('xen.service', function() {
    it('xen.service.running', function() {
      var vms = xen_service.runningXenInstances()
      assert.deepStrictEqual(vms, runningVms)
    });

    it('xen.service.all', function() {
      var items = xen_service.allXenInstances([])
      assert.deepStrictEqual(items, allVms)
    });
  });
});