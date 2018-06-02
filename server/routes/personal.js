var express = require('express');
var app = express();
var Personal = require('../models/personal');

var _ = require('underscore');


// =========================================
// Obtener todos los personas
// =========================================


app.get('/personal', (req, res, next) => {

    Personal.find({},
            'cedula area cargo email nombre fecha_nacimiento')
        .exec(
            (err, personal) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en la bd',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    personalempresa: personal
                });
            });


});

// =========================================
// Crear un nuevo persona
// =========================================

app.post('/personal', (req, res) => {

    var body = req.body;

    var personal = new Personal({
        cedula: body.cedula,
        area: body.area,
        cargo: body.cargo,
        email: body.email,
        nombre: body.nombre,
        fecha_nacimiento: body.fecha_nacimiento
    });
    personal.save((err, personalGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear persona',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            personal: personalGuardado
        });
    });



});

// =========================================
// actualiza un personal
// =========================================

app.put('/personal/:id', function(req, res) {

    let id = req.params.id;
    'cedula area cargo email nombre fecha_nacimiento'
    let body = _.pick(req.body, ['cedula',
        'area',
        'cargo',
        'email',
        'nombre',
        'fecha_nacimiento'
    ]);




    Personal.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, personalDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            personal: personalDB
        })

    })




});

// =========================================
// Eliminar un usuario por el ID
// =========================================

app.delete('/personal/:id', (req, res) => {
    var id = req.params.id;

    Personal.findByIdAndRemove(id, (err, personalBorrado) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar personal con id ' + id,
                errors: err
            });
        }

        if (!personalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un personal con ese id de => ' + id,
                errors: { message: 'no se encuentra porfavor vuelva a intentar' }
            });
        }

        res.status(201).json({
            ok: true,
            personalBorrado
        });
    });
});

module.exports = app;