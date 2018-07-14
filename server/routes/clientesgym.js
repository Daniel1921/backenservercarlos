var express = require('express');
var app = express();
var ClientesGym = require('../models/clientesgym');
var mail = require('../../mail.js');
var _ = require('underscore');


// =========================================
// Obtener todos los clientes
// =========================================


app.get('/clientes', (req, res, next) => {

    ClientesGym.find({},
            'cedula edad sexo nombre_completo precio fecha_caducidad')
        .exec(
            (err, cliente) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en la bd',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    clientes: cliente
                });
            });


});


// =========================================
// Obtener todos los personas una sola
// =========================================


app.get('/cliente/uno/:id', (req, res, next) => {
    var id = req.params.id;

    ClientesGym.findById(id).populate('ClientesGym', 'cedula edad sexo nombre_completo precio fecha_caducidad')
        .exec((err, cliente) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }
            if (!cliente) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'no existe'
                })
            }
            res.status(200).json({
                ok: true,
                cliente: cliente
            });
        })


});

// =========================================
// Crear un nuevo cliente
// =========================================

app.post('/clientes', (req, res) => {

    var body = req.body;

    var cliente = new ClientesGym({
        cedula: body.cedula,
        edad: body.edad,
        sexo: body.sexo,
        nombre_completo: body.nombre_completo,
        precio: body.precio,
        fecha_caducidad: body.fecha_caducidad
    });
    cliente.save((err, clienteIn) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear persona',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            cliente: clienteIn
        });

        var mailOptions = {
            from: 'caci6640@gmail.com@gmail.com',
            to: `danielmaflab@hotmail.com`,
            subject: 'Nuevo cliente en el gym',
            text: `el usuario de nombre ${clienteIn.nombre_completo}, de sexo ${clienteIn.sexo}, por un costo de ${clienteIn.precio}, estará abonado hasta ${clienteIn.fecha_caducidad}`
        };

        mail.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error,
                    mensaje: 'error al enviar mensaje'
                })
            } else {
                console.log('Email enviado: ' + info.response);
                return res.status(200).json({
                    ok: true,
                    mensaje: 'se ha enviado el mensaje correctamente',
                    info: info.response

                })
            }
        });
    });



});

// =========================================
// actualiza un cliente
// =========================================

app.put('/clientes/:id', function(req, res) {

    let id = req.params.id;
    'cedula edad sexo nombre_completo precio fecha_caducidad'
    let body = _.pick(req.body, ['cedula',
        'edad',
        'sexo',
        'nombre_completo',
        'precio',
        'fecha_caducidad'
    ]);




    ClientesGym.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, clienteDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            cliente: clienteDB
        })

    })




});

// =========================================
// Eliminar un cliente por el ID
// =========================================

app.delete('/cliente/:id', (req, res) => {
    var id = req.params.id;

    ClientesGym.findByIdAndRemove(id, (err, clienteOut) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar cliente con id ' + id,
                errors: err
            });
        }

        if (!clienteOut) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un cliente con ese id de => ' + id,
                errors: { message: 'no se encuentra porfavor vuelva a intentar' }
            });
        }

        res.status(201).json({
            ok: true,
            cliente: clienteOut
        });
    });
});

module.exports = app;