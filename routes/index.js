var express = require('express');
var router = express.Router();
const xen_controller = require('../controllers/xen.controller');

router.get('/', xen_controller.list);

module.exports = router;
