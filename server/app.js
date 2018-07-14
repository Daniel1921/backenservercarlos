var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const colors = require('colors');

// cors middleware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(require('./routes/personal.js'));
app.use(require('./routes/clientesgym.js'));



mongoose.connection.openUri('mongodb://localhost:27017/usuarios', (err, res) => {
    console.log(`Inicio de base de datos`.yellow);
    if (err) throw err;
    console.log(`iniciado la base de datos exitosamente`.green)

})

let port = 3000;


app.listen(port, () => {
    console.log(`expres server  http://localhost:${port} online`.blue)
});