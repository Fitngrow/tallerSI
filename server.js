var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var dataStore  = require("nedb");

var port = process.env.PORT || 10000;

//Con la instancia var app creamos nuestro servidor.
var baseApi = "/api/v1";

//Esto nos crea un objeto donde introducir información.
// Si no indico nada to-do esto lo hace en memoria pero luego veremos como añadirlo en un fichero
var db = new dataStore();

cl("DB initialized");

var contacts = [{ name: "pedro", phone: 123456789, email: "pedro@pedro.com"},
                { name: "pepe",  phone: 611112223, email: "pepe@pepe.com"  }
               ];

db.insert(contacts);
cl("Inserted 2 default contacts");
app.use(bodyParser.json());

app.get(baseApi+'/contacts', (req, res)=>{
    cl("New GET request over /contacts");
    db.find({}, (err,contacts)=>{
        if (err){
            res.sendStatus(500);
        }else{
            res.send(contacts);
        }
    });

});

app.post(baseApi+'/contacts', (req, res)=>{
    cl("New POST request over /contacts");
    var contact = req.body;
    db.insert(contact);
    res.sendStatus(200);

});


app.get(baseApi+'/contacts/:name', (req, res)=>{
    var name = req.params.name;
    cl("New GET request over /contacts/"+name);

    db.find({name: name}, (err,contacts)=>{
        if (err){
            res.sendStatus(500);
        }else{
            contacts.length > 0 ? res.send(contacts[0]) : res.sendStatus(404);
        }
    });

});

app.delete(baseApi+'/contacts/:name', (req, res)=>{
    var name = req.params.name;
    cl("New DELETE request over /contacts/"+name);

    db.remove({name: name},{}, (err,numRemoved)=>{
        if (err){
            res.sendStatus(500);
        }else{
            cl("Deleted "+numRemoved+" objects")
            res.sendStatus(200);
        }
    });

});

app.listen(port, ()=>{console.log("Server running on port " + port)});

function cl(s){console.log(s)}