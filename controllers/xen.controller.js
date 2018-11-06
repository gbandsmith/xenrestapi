const xen_service = require('../services/xen.service');

exports.list = function (req, res, next) {
  var runningVms = xen_service.runningXenInstances()
  var allVms = xen_service.allXenInstances(runningVms)
  res.send(allVms)
}