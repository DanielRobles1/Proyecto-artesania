//instruccion de javascript para obtener la biblioteca que permite hacer o conectar con mongo
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
name:{type:String, require:true},
descripcion:{type:String,require:true},
precio:{type:Number, require:true},
stock:{type:Number, require:true}


});

module.exports = mongoose.model('producto', productoSchema);