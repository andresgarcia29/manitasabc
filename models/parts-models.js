'use strict';

const conn = require('./parts-schema.js');

class PartsModel{
    setOne(part, cb){
        conn.create(part, (err) => {
            if (err) throw err;
            cb();
        });
    }
    getOne(part, cb){
        conn
            .find({
                seccion : part
            })
            .exec((err,docs) => {
                if (err) throw err;
                cb(docs);
            });
    }
    getOneTexto(part, cb){
        conn
            .findOne({
                texto : part
            })
            .exec((err,docs) => {
                if (err) throw err;
                cb(docs);
            });
    }
}

module.exports = PartsModel;
