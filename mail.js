var nodemailer = require('nodemailer');

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Caci6640@gmail.com',
        pass: 'Colombia123'
    }
});


module.exports = {
    transporter
}