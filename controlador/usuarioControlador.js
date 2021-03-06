var mongoose = require("mongoose");
require("../modelo/usuarioModel");

var usuarioModel = mongoose.model("Usuario");
var controladoValidar = require("./ValidarControldor");

exports.addUsuario = function (req, callback) {
    var objUsuario = new usuarioModel();
    objUsuario.nombre = req.body.nombre;
    objUsuario.cedula = req.body.cedula;
    objUsuario.fechaCreacion = new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' });
    
    controladoValidar.ValidarUser(objUsuario.cedula).then((res) => {
        if (!res) {
            objUsuario.save(function (err, retorno) {
            if (err) callback({ estado: { codigo: 2, respuesta: "Error al guardar!" } });
              callback({estado: { codigo: 1, respuesta: "Usuario guardado con éxito!" },usuario: retorno,});
          });
        } else {callback({estado: { codigo: 2, respuesta: "Usuario ya está registrado!!" },});}
      }).catch(() => {console.log("Algo salió mal");});  
};


exports.findUser= function (cedula) {
  return new Promise((resolve, reject) => {
    usuarioModel.findOne({ cedula: cedula }, function (err, res) {
      if (!res) resolve(0);
      else if (err) reject(err);
      else return resolve(res);
    });
  });
}