const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//Donde se guarda la informacion del jugador
let jugador = {
    nombre:'',
    apellidos:'',
    score:''

};

//Respuesta de error
let respuesta = {
   error: false,
    codigo: 200,
    mensaje:''

};

   //Jugador para demostrar si alguien ya esta creado
  let jugadorPepe = {
    nombre:'Pepe',
    apellidos:'Moash',
    score:'2'
};

    //El post le pido los tres apartados de jugador
   app.post('/jugador', function (req, res) {
       
    if(!req.body.nombre || !req.body.apellidos || !req.body.score) { //Si uno de los tres es nulo da error
        respuesta = {
        error: true,
        codigo: 502,
        mensaje: 'Necesitas incluir un nombre, apellido y score para el jugador'
        };
    } 
    else {
        if(req.body.nombre == jugadorPepe.nombre && req.body.apellidos == jugadorPepe.apellidos) { //Si los dos, el nombre y el apellido estan repetidos da error
          
            respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'El jugador ya fue creado previamente, deja de registrarte ' + jugadorPepe.nombre + " " + jugadorPepe.apellidos
            };
        } 
        else {  //No da errores y muestra el resultado
            jugador = {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos
                };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'jugador creado',
                respuesta: jugador
                };
            }
    }    
    res.send(respuesta);
   });

app.listen(3000, () => {
console.log("El servidor esta iniciado");
});