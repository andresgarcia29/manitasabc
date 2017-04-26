'use strict';

const AuthModel = require('../models/auth-models'),
	errors = require('../middlewares/errors'),
	am = new AuthModel();

class AuthController {
    signInGet(req, res, next) {
		res.render('sign-in', { title: 'Registro de Usuarios' });
	}
	signInPost(req, res, next){
		// Recuperando los datos
		let user = {
			user_id: 0,
			name : req.body.name,
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
			sexo : req.body.sexo,
		};
		let mini_user = {
			username : req.body.username,
		}
		let user_mail = {
			email : req.body.email,
		}
		// Los pasamos a la consola
		console.log(user);

		//Guardamos

		am.getRepeatUser(mini_user, (docs) => {
			if (docs == null){
				am.getMail(user_mail, (docs) => {
					if (docs == null){
						am.setUser(user, (docs) => {
							res.render('sign-in', { title: 'Registro de Usuarios', creado: `El usuario ${user.username} ha sido creado correctamente` });
						});
					}else{
						res.render('sign-in', {title: 'Registro de Usuarios', email: true});
					}
				});
			}else{
				console.log(docs);
				res.render('sign-in', { title: 'Registro de Usuarios', usuario: true });
			}
		});
	}
	logInGet(req, res, next){
		if (req.session.username){
			res.redirect('/dashboard');
		}else{
			res.render('login', { title : "LogIn" });
		}
	}
	loginPost(req, res, next){
		let user = {
			username : req.body.username,
			password : req.body.password
		};
		am.getUser(user, (docs) => {
			if (docs == null){
				res.render('login', {title: 'LogIn', error : true});
			}else{
				req.session.username = ( docs != null ) ? docs.username : null;
				req.session.name = ( docs != null ) ? docs.name : null;
				req.session.email = ( docs != null ) ? docs.email : null;
				req.session.sexo = ( docs != null ) ? docs.sexo : null;
				req.session.usertype = (docs != null) ? docs.puesto : null;

				console.log(req.session, '---', docs);

				req.app.locals.loggeado = true;

				res.redirect('/dashboard');
			}
		});
	}
	dashboardGet(req, res, next){
		if (req.session.username){
			res.render('dashboard', {
				title: "Dashboard",
				sexo : req.session.sexo,
				username : req.session.username || "Andres",
				name : req.session.name || "Jose",
				email : req.session.email || "jos.an"
			});
		}else{
			res.redirect('/login');
		}
	}
	logoutGet(req, res, next){
		if (req.session.username){
			req.session.destroy((err) => {
				if (err){
					errors.http500(req, res, next);
				}else{
					req.app.locals.loggeado = false;;
					res.redirect('/');
				}
			})
		}else{
			res.redirect('/login');
		}
	}
	learningGet(req, res, next){
		res.render('aprender', {title : "Aprende"});
	}
}

module.exports = AuthController;
