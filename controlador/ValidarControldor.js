
require("../modelo/usuarioModel");
var mongoose = require("mongoose");

var usuarioModel = mongoose.model("Usuario");

exports.ValidarUser=function (cedula) {
  return new Promise((resolve, reject) => {
      usuarioModel.exists({ cedula: cedula }, function (err, res) {
        if (!res) resolve(0);
        else if (err) reject(err);
        else return resolve(res);
      });
    });
  }
