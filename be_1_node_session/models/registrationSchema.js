const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registrationSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('myRegistrationSchema', registrationSchema)