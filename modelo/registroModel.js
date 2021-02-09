var mongoose = require("mongoose");


var Schema = mongoose.Schema;
var registroSchema = new Schema({

    //fecha : {type: String, required :true , default: dateFormat(new Date(), "d/m/yy HH:MM")},

    //fecha: { type: String, required: true, default:dateFormat(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota'}), "d/m/yy HH:MM") },
    fecha: String,
    cedula: String,
    temperatura: Number
});



module.exports = mongoose.model("Registro", registroSchema);