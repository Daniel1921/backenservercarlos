const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;



let personalSchema = new Schema({

    cedula: {
        type: String
    },
    area: {
        type: String
    },

    cargo: {
        type: String,
        default: 'USER_ROLE'
    },
    email: {
        type: String
    },
    nombre: {
        type: String
    },
    fecha_nacimiento: {
        type: String
    }

});





module.exports = mongoose.model('Personal', personalSchema);