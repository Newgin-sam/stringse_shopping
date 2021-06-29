const express = require('express');
const brandController = require('../controllers/brand.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/brand', auth('createAny', 'brand'), brandController.addBrand)
router.post('/all', brandController.getBrands);
router.route('/brand/:id')
    .get(brandController.getBrand)
    .delete(auth('deleteAny', 'brand'), brandController.deleteBrandById);


module.exports = router;