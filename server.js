/**
 * Created by Albert_FX on 09/11/2016.
 */

/*
Vamos a utilizar un modulo, llamado express, que nos permitirá de una forma sencilla hacer un servicio web
 */
var express = require('express');

/*
    Con la instancia var app creamos nuestro servidor.
 */
var app = express();


var contact1 = {
    name: "alberto",
    phone: 123456789
};
var contact2 = {
    name: "luis",
    phone: 321654987
};


/*
    Definimos una función de callback que se va a ejecutar cada vez que haga alguien un get al servidor
    req: Petición
    res: Objeto de la respuesta
 */
app.get('/', function(req, res){
    res.send("Hello world from server");
});

app.listen(1000);

console.log("Running...");
