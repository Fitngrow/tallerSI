var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var dataStore  = require("nedb");
var path       = require("path");

var port = process.env.PORT || 10000;
var baseApi = "/api/v1";
var dbFileName = path.join(__dirname,'contacts.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Esto nos crea un objeto donde introducir información.
// Si no indico nada to-do esto lo hace en memoria pero luego veremos como añadirlo en un fichero
var db = new dataStore({
    filename: dbFileName,
    autoload: true
});

cl("DB initialized");

db.find({}, (err, contacts)=>{
    if(contacts.length == 0){
        db.insert([{ name: "pedro", phone: 123456789, email: "pedro@pedro.com"},
                   { name: "pepe",  phone: 611112223, email: "pepe@pepe.com"  }
                  ]);
    }else{
        cl("Loaded DB with "+contacts.length+" contacts");
    }
});


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
    var name = contact.name;
    db.find({name: name},{}, (err, contacts)=>{
        if(err){
            res.sendStatus(500);
        }else{
            if(contacts.length>0){
                res.sendStatus(409);
            }else{
                db.insert(contact);
                res.sendStatus(200);
            }
        }
    });
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
            cl("Deleted "+numRemoved+" objects");
            res.sendStatus(200);
        }
    });
});

app.delete(baseApi+'/contacts/', (req, res)=>{
    cl("New DELETE request over /contacts");

    db.remove({},{multi: true}, (err,numRemoved)=>{
        if (err){
            res.sendStatus(500);
        }else{
            cl("Deleted "+numRemoved+" objects");
            res.sendStatus(200);
        }
    });
});

app.put(baseApi+'/contacts/:name', (req, res)=>{
    var name = req.params.name;
    var contact = req.body;

    cl("New PUT request over /contacts/"+name);
    cl("Data: "+JSON.stringify(contact,2));

    if(name != contact.name){
        res.sendStatus(409);
        return;
    }

    db.update({name: name},contact,{}, (err, numAffected)=>{
        if (err){
            res.sendStatus(500);
        }else{
            cl("Updated "+numAffected+" objects");
            res.sendStatus(200);
        }
    });

});

app.listen(port, ()=>{console.log("Server running on port " + port)});

function cl(s){console.log(s)}