'use strict';

const express = require('express'),
	pug = require('pug'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	errors = require('./middlewares/errors'),
	auth = require('./routes/auth-router'),
	parts = require('./routes/parts-router'),
	welcome = require('./routes/welcome-router'),
	// videojs = require('video.js'),
	favicon = require('serve-favicon')(`${__dirname}/public/images/logo.png`),
	publicDir = express.static(`${__dirname}/public`),
	optSession = { secret:'shhhh', saveUninitialized: true, resave: true },
	formidable = require('express-formidable'),
	viewDir = `${__dirname}/views`,

	port = (process.env.PORT || 3000);

let app = express();

app

	.set( 'views', viewDir )
	.set( 'view engine', 'pug' )
	.set('port', port)

	.use ( session(optSession) )
	.use( bodyParser.json() )
	.use( bodyParser.urlencoded({ extended: false }) )
	.use( restFul )
	.use( publicDir )
	.use( favicon )
	// .use ( videojs )
	.use( morgan('dev') )

	.use( auth )
	.use ( formidable( { keepExtension : true } ) )
	.use( parts )
	.use( welcome );


app.locals.loggeado = false;

module.exports = app;
