const mongoose = require('mongoose');
const moment=require('moment')
const Recruter_model = new mongoose.Schema({
    recruiter_id: {
        type: mongoose.Types.ObjectId,
    },
    Recruiter:{
        type:String,
        default:'Recruiter'
    },
    Email: {
        type: String,
        required: true, 
        unique: true,   
        lowercase: true 
    },
    Password: {
        type: String,
        required: true
    },
    recruiter_name: {
        type: String,
        required: true
    },
    createdAT:{
        type:String,
        default:moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
    }
});

const Recruter_schema = mongoose.model('Recruter', Recruter_model);
module.exports = Recruter_schema;
