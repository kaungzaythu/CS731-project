const mongoose = require('mongoose')

const userTableSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please include a first name']
    },
    last_name: {
        type: String,
        required: [true, 'Please include a last name']
    },
    introduction: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please include an email'],
        unique: true
    },
    phone_number: {
        type: String,
    },
    profile_picture : {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please include a password']
    },
},
{
    timestamp: true
})

module.exports = mongoose.model('UserTable', userTableSchema)