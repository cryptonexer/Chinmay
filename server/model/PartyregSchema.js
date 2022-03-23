const mongoose = require('mongoose');

const PartyregSchema = new mongoose.Schema({
    Party_name: {
        type: String,
        required: true
    },
    Candidate_name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Slogan: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: String
    },
    Image: {
        type: String
    },
    Count: {
        type: Number,
    }
})


const Partyreg = mongoose.model('parties', PartyregSchema);

module.exports = Partyreg;