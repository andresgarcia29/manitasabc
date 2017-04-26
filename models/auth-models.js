'use strict';

const conn = require('./auth-schema.js');

class AuthModel {

    getUser(user, cb){
        conn
            .findOne({
                username : user.username,
                password : user.password
            })
            .exec((err,docs) => {
                if (err) throw err;
                cb(docs);
            });
    }
    getRepeatUser(user, cb){
        conn
            .findOne({
                username: user.username
            })
            .exec((err, docs) => {
                if (err) throw err;
                cb(docs);
            });
    }

    getMail(user, cb){
        conn.findOne({
            email : user.email
        })
        .exec((err,docs) => {
            if (err) throw err;
            cb(docs);
        });
    }

    setUser(user, cb){
        conn.create(user, (err) => {
            if (err) throw err;
            cb();
        });
    }

}

module.exports = AuthModel;