'use strict';

const moongose = require('./model'),
    Schema = moongose.Schema,
    PartsSchema = new Schema({
        texto : String,
        imagen : String,
        video : String,
        nivel : Number,
        seccion : String

    },{
        collection : "parts"
    }),
    Parts = moongose.model('Parts', PartsSchema);

module.exports = Parts;
