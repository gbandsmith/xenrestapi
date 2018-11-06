var proc = require('child_process');
var fs = require('fs');

exports.runningXenInstances = function(next, callback) {
  proc.exec('xen list', (err, stdout, stderr) => {
    if (err) return next(err)
    //console.log(stdout)
    // break the textblock into an array of lines
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
    callback(vms)
  });
}

exports.allXenInstances = function(next, callback, runningVms) {
  fs.readdir("/etc/xen", function(err, items) {
    if (err) return next(err)
    StoppedVms = items.filter(function(el) {
      // remove running instances
      var isRunning = false;
      runningVms.forEach(function(vm) {
        if(vm.name == el) {
          isRunning = true;
        }
      })
      return !isRunning;
    }).map(function(el) {
      return {name: el, state: "stopped"}
    })
    callback(runningVms.concat(StoppedVms))
  });
}