var proc = require('child_process');
var fs = require('fs');

const notVms = ["old", "scripts", "xend", "xl"]

exports.runningXenInstances = function() {
  var stdout = proc.execSync('xen list');
  var lines = stdout.split('\n');
  // remove one line, starting at the first position
  lines.splice(0,2);
  vms = lines.map(function(element) {
    vm = {}
    info = element.split(' ').filter(function(el) {
      return el != ''
    })
    vm.name = info[0]
    vm.id = parseInt(info[1])
    vm.ram = parseInt(info[2])
    vm.vcpu = parseInt(info[3])
    vm.state = "running"
    return vm
  })
  return vms;
}

exports.allXenInstances = function(runningVms) {
  var items = fs.readdirSync("/etc/xen")
  StoppedVms = items.filter(function(el) {
    // remove running instances
    var isRunning = false;
    runningVms.forEach(function(vm) {
      if(vm.name == el) {
        isRunning = true;
      }
    })
    // remove other files
    var isVm = true;
    notVms.forEach(function(notvm) {
      if(el.startsWith(notvm)) {
        isVm = false;
      }
    })
    return !isRunning && isVm;
  }).map(function(el) {
    return {name: el, state: "stopped"}
  })
  return runningVms.concat(StoppedVms)
}