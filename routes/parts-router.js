'use strict';

const PartsController = require('../controllers/parts-controller'),
    express = require('express'),
    router = express.Router(),
    pc = new PartsController();

router

    .get('/create_part', pc.createGet)
    .post('/create_part', pc.createPost)

    .get('/nivel1', pc.levelOneGet)
    .get('/nivel2', pc.levelTwoGet)
    .get('/nivel3', pc.levelThreeGet)

    .get('/nivel1/:seccion', pc.levelOneParamsGet)
    .get('/nivel2/:seccion', pc.levelTwoParamsGet)
    .get('/nivel3/:seccion', pc.levelThreeParamsGet)

    .get('/nivel1/:seccion/:texto', pc.levelOneParamsGetForKey)
    .get('/nivel2/:seccion/:texto', pc.levelTwoParamsGetForKey)
    .get('/nivel3/:seccion/:texto', pc.levelThreeParamsGetForKey);

module.exports = router;
