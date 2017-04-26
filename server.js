'use strict';

const app = require('./app.js'),

server = app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo desde: ${app.get('port')} `);
});