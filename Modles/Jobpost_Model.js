const mongoose = require('mongoose');
const moment=require('moment')
const Jobpost_model = new mongoose.Schema({
    Jobpost_id: {
        type: mongoose.Types.ObjectId,
    },
    Job_Title:{
        type:String
    },
    Job_Description:{
        type:String
    },
    Position_name:{
        type:String
    },
    Posted_by_id: {
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

const Jobpost_schema = mongoose.model('Jobpost', Jobpost_model);
module.exports = Jobpost_schema;
