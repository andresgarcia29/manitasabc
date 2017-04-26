'use strict';
const errors = require('../middlewares/errors');

class WelcomeController{
    index(req, res, next){
        res.render('index', {
            title : 'ManitasABC'
        });
    }
}

module.exports = WelcomeController;