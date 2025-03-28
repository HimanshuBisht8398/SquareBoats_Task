
const mongoose = require('mongoose');
const moment=require('moment')
const Jobapplies_model = new mongoose.Schema({
    Job_applied_id:{
        type: mongoose.Types.ObjectId,
    },
    Jobpost_id: {
        type: String,
    },
    Position_name:{
        type:String
    },
    Job_title:{
        type:String
    },
    Job_Description:{
        type:String
    },
    job_posted_by:{
        type:String,
        require:true
    },
    applied_by_id: {
        type: String,
        required: true, 
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

const Jobapplies_schema = mongoose.model('Jobapply', Jobapplies_model);
module.exports = Jobapplies_schema;
