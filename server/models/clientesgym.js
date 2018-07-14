const mongoose = require('mongoose');
let Schema = mongoose.Schema;



let clienteSchema = new Schema({

    cedula: {
        type: String
    },
    edad: {
        type: String
    },

    sexo: {
        type: String,
        default: 'USER_ROLE'
    },
    nombre_completo: {
        type: String
    },
    precio: {
        type: String
    },
    fecha_caducidad: {
        type: String
    }

});





module.exports = mongoose.model('ClientesGym', clienteSchema);