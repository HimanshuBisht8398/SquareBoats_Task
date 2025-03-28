const mongoose = require('mongoose');
const moment=require('moment')
const Candidate_model = new mongoose.Schema({
    student_id: {
        type: mongoose.Types.ObjectId,
    },
    role:{
        type:String,
        default:'Candidate'
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
    student_name: {
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

const Candidate_schema = mongoose.model('Candidate', Candidate_model);
module.exports = Candidate_schema;
