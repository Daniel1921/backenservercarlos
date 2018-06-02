var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const colors = require('colors');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// app.use(require('./routes/index.js'));




mongoose.connection.openUri('mongodb://localhost:27017/usuarios', (err, res) => {
    console.log(`Inicio de base de datos`.yellow);
    if (err) throw err;
    console.log(`iniciado la base de datos exitosamente`.green)

})

let port = 3000;


app.listen(port, () => {
    console.log(`expres server  http://localhost:${port} online`.blue)
});