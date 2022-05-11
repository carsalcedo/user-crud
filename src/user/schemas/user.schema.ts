import {Schema} from 'mongoose';

export const UserSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    documento: String,
    ci: {type: String, required: true},
    pais: {type: String, required: true},
    createAt: {
        type: Date,
        default: Date.now
    }
})