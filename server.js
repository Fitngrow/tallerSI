/**
 * Created by Albert_FX on 09/11/2016.
 */

//Vamos a utilizar un modulo, llamado express, que nos permitirá de una forma sencilla hacer un servicio web

var express = require('express');

//Modifica un objeto javascript a JSON
var bodyParser = require('body-parser');


//Con la instancia var app creamos nuestro servidor.
var app = express();
var apiBaseURL = "/api/v1";

var contact1 = { name: "alberto", phone: 123456789 };
var contact2 = { name: "luis", phone: 321654987 };

var contacts = [contact1, contact2];

app.use(bodyParser.json());

/*
    Definimos una función de callback que se va a ejecutar cada vez que haga alguien un get al servidor
    req: Petición
    res: Objeto de la respuesta
 */
app.get(apiBaseURL+'/contacts', function(req, res){
    res.json(contacts);
});

app.listen(1000);

console.log("Running...");
