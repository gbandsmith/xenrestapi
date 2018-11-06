const xen_service = require('../services/xen.service');

exports.list = function (req, res, next) {
  xen_service.runningXenInstances(next, function(items) {
    xen_service.allXenInstances(next, res.send, items);
  })
}