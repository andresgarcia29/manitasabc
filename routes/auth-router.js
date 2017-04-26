'use strict';

const AuthController = require('../controllers/auth-controller'),
    express = require('express'),
    router = express.Router(),
    ac = new AuthController();

router
    .get('/create', ac.signInGet)
    .post('/create', ac.signInPost)
    .get('/login', ac.logInGet)
    .post('/login', ac.loginPost)
    .get('/dashboard', ac.dashboardGet)
    .get('/logout', ac.logoutGet)
    .get('/learning', ac.learningGet);

module.exports = router;
