const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    },
    toDo: [{
        text: {
            type: String,
            required: true,
            maxlength: 150
        },
        status: {
            type: String,
            enum: ['Execute', 'Completed', 'Canceled'],
            default: 'Execute',
        },
        create: {
            type: Date,
            default: Date.now()
        }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;