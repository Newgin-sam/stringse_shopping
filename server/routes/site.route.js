const express = require('express');
const siteController = require('../controllers/site.controller');
const auth = require('../middleware/auth');
const router = require('./auth.route');
const route = express.Router();


router.route('/')
    .get(siteController.getSiteArgs)
    .post(auth('createAny', 'site'), siteController.postSiteArgs)
    .patch(auth('updateAny', 'site'), siteController.updateSiteArgs)

module.exports = router;