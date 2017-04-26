'use strict';

const PartsModel = require('../models/parts-models'),
    errors = require('../middlewares/errors'),
    fs = require("fs"),
    pm = new PartsModel();

class PartsController{
    createGet(req, res, next){
        if(req.session.usertype == "admin"){
            res.render('create_part', {title : "Crear Seccion"});
        }else{
            res.redirect('/');
        }

    }
    createPost(req, res, next){
        if(req.session.usertype == "admin"){
            let imagen = req.files.imagen,
            img_path = imagen.path,
            img_name = imagen.name,
            img_ruta = "./public/contenido/img/" + img_name,
            img_extension = imagen.name.split(".").pop(),
            img_ruta_especial = '/contenido/img/' + img_name;

            let video = req.files.video,
                video_path = video.path,
                video_name = video.name,
                video_ruta = "./public/contenido/videos/" + video_name,
                video_extension = video.name.split(".").pop(),
                video_ruta_especial = '/contenido/videos/' + video_name;

            if ( img_extension != "jpg" && img_extension != "png"){
                res.render('create_part', {title : "Crear seccion", imagenfalsa : true});
            }else{
                if (fs.existsSync(img_ruta) || fs.existsSync(video_ruta)){
                    res.render('create_part', {title : "Crear seccion", repitiendo : true});
                }else{
                    fs.rename(img_path, img_ruta);
                    fs.rename(video_path, video_ruta);

                    let part = {
                        part_id: 0,
                        texto : req.fields.texto,
                        imagen : img_ruta_especial,
                        video : video_ruta_especial,
                        nivel : req.fields.nivel,
                        seccion : req.fields.seccion
                    }
                    console.log(part);

                    pm.setOne(part, (docs) => {
                        if(docs == null){
                            res.render('create_part', {title : "Crear seccion", exito : true});
                        }else{
                            res.render('create_part', {title : "Crear seccion", error : true});
                        }
                    });
                }

            }
        }else{
            res.redirect('/');
        }
    }
    levelOneGet(req, res, next){
        req.session.username
        ? res.render('nivelone', {title : 'Nivel 1'})
        : res.redirect('/login');
    }
    levelTwoGet(req, res, next){
        req.session.username
        ? res.render('niveltwo', {title : 'Nivel 2'})
        : res.redirect('/login');
    }
    levelThreeGet(req, res, next){
        req.session.username
        ? res.render('nivelthree', {title : 'Nivel 3'})
        : res.redirect('/login');
    }
    levelOneParamsGet(req, res, next){
        if (req.session.username){
            let seccion = req.params.seccion;
            console.log(seccion);
            
            pm.getOne(seccion, (docs) => {
                if (docs != null){
                    res.render('nivelone_seccion', {
                        title: 'Busqueda',
                        secciones_vista : docs
                    });
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.redirect('/login');
        }

    }
    levelTwoParamsGet(req, res, next){
        if (req.session.username){
            let seccion = req.params.seccion;
            console.log(seccion);
            
            pm.getOne(seccion, (docs) => {
                if (docs != null){
                    res.render('niveltwo_seccion', {
                        title: 'Busqueda',
                        secciones_vista : docs
                    });
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.redirect('/login');
        }
    }
    levelThreeParamsGet(req, res, next){
        if (req.session.username){
            let seccion = req.params.seccion;
            console.log(seccion);
            
            pm.getOne(seccion, (docs) => {
                if (docs != null){
                    res.render('nivelthree_seccion', {
                        title: 'Busqueda',
                        secciones_vista : docs
                    });
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.redirect('/login');
        }
    }
    levelOneParamsGetForKey(req, res, next){
        if (req.session.username){
            let texto = req.params.texto;
            console.log(texto);
            pm.getOneTexto(texto, (docs) => {
                if(docs != null){
                    console.log('--------------------------');
                    console.log(docs);
                    console.log('--------------------------');
                    res.render('niveloneforkey', {
                        title : "Elemento " + docs.texto,
                        elemento : docs
                    });
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.redirect('/login');
        }
        

    }
    levelTwoParamsGetForKey(req, res, next){
        if (req.session.username){
            let texto = req.params.texto;
            console.log(texto);
            res.render('niveloneforkey', {title: "Clave"});
        }else{
            res.redirect('/login');
        }
        
    }
    levelThreeParamsGetForKey(req, res, next){
        if (req.session.username){
            let texto = req.params.texto;
            console.log(texto);
            res.render('niveloneforkey', {title: "Clave"});
        }else{
            res.redirect('/login');
        }
        
    }
}

module.exports = PartsController;
