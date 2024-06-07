const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    token: {
        type: String
    },
    role: {
        type: String,
        emum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type : String,
        default: 'uploads/avatar.png'
    }

});


module.exports = mongoose.model('User', userSchema);