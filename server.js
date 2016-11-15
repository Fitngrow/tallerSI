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
    
    //res.json(contacts);

});

app.post(baseApi+'/contacts', (req, res)=>{
    cl("New POST request over /contacts");
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(200);

});

app.listen(port, ()=>{console.log("Server running on port " + port)});

function cl(s){console.log(s)}