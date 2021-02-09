
var express = require("express");
var bodyparser = require("body-parser");
var methodoverride = require("method-override");
var mongoose = require("mongoose");
var controladorUsuario = require("./controlador/usuarioControlador");
var controladorRegistro = require("./controlador/registroControlador");
const dateFormat = require('dateformat');
require('dotenv').config();


console.log(dateFormat(new Date(), "d/m/yy HH:MM p"));
console.log(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));

var app = express();

app.use(bodyparser.json());
app.use(methodoverride());

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port,host,() => {
  console.log("Servidor works!");
});


mongoose.connect(process.env.DB_URL,  { useUnifiedTopology: true })
var db = mongoose.connection

db.on('error', function(err){
  console.log('Error en conexión!', err)
})

db.once('open', function(){
  console.log('Conectado a la base de datos con éxito!')
})

var router = express.Router();

router.get("/", function (req, res) {
  res.send("hola mundo desde nodeman22222");
});

router.post("/API/usuario/addUsuario", function (req, res) {
  controladorUsuario.addUsuario(req, function (data) {
    res.send(data);
  });
});

router.post("/API/registro/addRegistro", function (req, res) {
  controladorRegistro.addRegistro(req, function (data) {
    res.send(data);
  });
});

router.get("/API/registro/listRegistro", function (req, res) {
  controladorRegistro.listarRegistros(req, function (data) {
    res.send(data);
  });
});

router.get("/API/registro/listRegistroByID/:cedula", function (req, res) {
  controladorRegistro.listarRegistroByID(req, function (data) {
    res.send(data);
  });
});


app.use((req, res, next) => {

  // Dominio que tengan acceso (ej. 'http://example.com')
     res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Metodos de solicitud que deseas permitir
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
     res.setHeader('Access-Control-Allow-Headers', '*');
  
  next();
  })

app.use(router);
