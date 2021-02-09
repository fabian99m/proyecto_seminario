var mongoose = require("mongoose");
require("../modelo/registroModel");
require("../modelo/usuarioModel");


var registroModel = mongoose.model("Registro");
var controladoValidar = require("./ValidarControldor");
var usuarioControlador = require("./usuarioControlador");


exports.addRegistro = function (req, callback) {
  var objRegistro = new registroModel();
  objRegistro.cedula = req.body.cedula;
  objRegistro.temperatura = req.body.temperatura;
  objRegistro.fecha = new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' });

  controladoValidar.ValidarUser(objRegistro.cedula).then((res) => {
      if (res) {
        objRegistro.save(function (err, retorno) {
          if (err) callback({ estado: { codigo: 3, respuesta: "Error al guardar!" } });
          callback({ estado: { codigo: 1, respuesta: "Visita guardada con éxito!" }, registro: retorno});
        });
      } else {
        callback({ estado: {codigo: 2, respuesta: "Primero registre el cliente!" }});
      }
  })
};

exports.listarRegistros = function (req, callback) {
  registroModel.find({}, function (err, listReg) {
    if (err)
      callback({estado: { codigo: 3, respuesta: "Error al buscar registros!" },});
    callback({
      estado: { codigo: 1, respuesta: "Proceso exitoso!" },
      registros: listReg,});
  });
};

exports.listarRegistroByID = function (req, callback) {

  usuarioControlador.findUser(req.params.cedula).then((res) => {

     registroModel.find({ cedula: req.params.cedula }, function (err, listReg) {
       if (err) callback({ estado: { codigo: 3, respuesta: "Error al buscar registros!" } });
       
      callback({ estado: { codigo: listReg.length == 0 ? 2 :1, respuesta: "Proceso exitoso!" },
        registros: listReg, cantidad: listReg.length,usuario:res });});    
   })
};
