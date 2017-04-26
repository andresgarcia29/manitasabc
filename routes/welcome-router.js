'use strict';

const WelcomeController = require('../controllers/welcome-controller'),
    express = require('express'),
    router = express.Router(),
    wc = new WelcomeController();


router
    .get('/', wc.index);

module.exports = router;