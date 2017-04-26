'use strict';

const mongoose = require('./model'),
    Schema = mongoose.Schema,
    AuthSchema = new Schema({
        name : String,
        username : String,
        email : String,
        password : String,
        sexo : {type : Number, default : 0},
        cursos : {type : Number, default : 1},
        calificaciones : Array,
        puesto : {type: String, default : "normal"}
    },
    {
        collection : 'auth'
    }),
    Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;
