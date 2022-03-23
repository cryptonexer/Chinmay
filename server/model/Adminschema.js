const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    Email:{
        type: String,
        unique: true,
        required:true
    },
    Password:{
        type: String,
        required: true
    }
})

const Adminlogin = mongoose.model('Admin',AdminSchema);

module.exports = Adminlogin;