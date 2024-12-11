const router = require('express').Router();
const administrativeController = require('../controllers/administrative.controller');

router.get('/provinces', administrativeController.getProvinces);
router.get('/districts/:province', administrativeController.getDistricts);
router.get('/wards/:province/:district', administrativeController.getWards);

module.exports = router; 