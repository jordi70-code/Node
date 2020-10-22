const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());



//Donde se guarda la informacion del jugador
let jugador = {
    nombre:'',
    apellidos:'',
    score:'',
    posicio:'',
    alies:''
};


let jugadors = [{
        posicio: 0,
        alies: "dummy",
        nombre: "test",
        apellidos: "test",
        score: 0
}];



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
   app.post('/jugadors/:alias', function (req, res) {
       
    if(!req.body.nombre || !req.body.apellidos || !req.body.score || !req.params.alias) { //Si uno de los tres es nulo da error
        respuesta = {
        error: true,
        codigo: 502,
        mensaje: 'Necesitas incluir un nombre, apellido, score para el jugador y alias'
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
           
            
                jugadors[jugadors.length] = {
                    posicio: jugadors.length +1,
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    alies: req.params.alias,
                    score: req.body.score
                    };
                

            
            
            
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'jugador creado',
                respuesta: jugadors[jugadors.length - 1]
                };
            }

            jugadors.sort((a,b)  => (a.score < b.score ? 1 : -1));
            for(i = 0; i < jugadors.length; i++){
                jugadors[i].posicio = i+1;
    
            }

            var last = jugadors[jugadors.length - 1];
            if (last.nombre == "test"){

            jugadors.splice(-1,1);
            }
    }    
    res.send(respuesta);
});



app.put('/jugadors/:alies', function(req, res){  
if(!req.body.nombre || !req.body.apellidos || !req.body.score || !req.params.alias) { //Si uno de los tres es nulo da error   
    respuesta = {
        error: false,
        codigo: 502,
        mensaje: 'Faltan campos en el put',
    }; 
}
else{
    x = 0;
    jugadornum = 0;
    for(i = 0; i < jugadors.length; i++){
        if(req.params.alias != jugadors[i].alies) {
            x++;
        } 
        else{
            jugadornum = i;
        }
    }
    if (x == jugadors.length){
        respuesta = {
            error: false,
            codigo: 504,
            mensaje: 'jugador no existe',
            };
    }
    else {
        jugadors [jugadornum] = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            alies: req.params.alias,
            score: req.body.score
            };
        }
    }

    jugadors.sort((a,b)  => (a.score < b.score ? 1 : -1));
        for(i = 0; i < jugadors.length; i++){
            jugadors[i].posicio = i+1;

        }
});

    app.get('/ranking', function (req, res) {
    res.send(jugadors);
    });

    app.get('/ranking/:alias', function (req, res) {
      
        for(i = 0; i < jugadors.length; i++){
            
            if (req.params.alias == jugadors[i].alies){

                 
                res.send(jugadors[i]);

            }
            
        }
    
    });

app.listen(3000, () => {
console.log("El servidor esta iniciado");
});