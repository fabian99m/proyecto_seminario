var mongoose = require("mongoose");
const dateFormat = require('dateformat');


var Schema = mongoose.Schema;
var registroSchema = new Schema({

    //fecha : {type: String, required :true , default: dateFormat(new Date(), "d/m/yy HH:MM")},

    fecha: { type: String, required: true, default:dateFormat(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota'}), "d/m/yy HH:MM") },
    cedula: String,
    temperatura: Number
});



module.exports = mongoose.model("Registro", registroSchema);