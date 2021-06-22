const express = require('express');
const brandController = require('../controllers/brand.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/brand', auth(), brandController.addBrand)

module.exports = router;