var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
  nombre: String,
  cedula: String,
  fechaCreacion: String
});


module.exports = mongoose.model("Usuario", usuarioSchema);
