const express=require('express')
const app=express.Router();
const Recruter_controller=require('../Controllers/Recruiter_controller')
const {authenticate_recruter}=require('../Middleware/Middleware')
module.exports=app=>{

    app.post('/api/v1/recruiter/signup',Recruter_controller.recruiter_signup)
    app.post('/api/v1/recrutier/login',Recruter_controller.recruiter_login)
    app.post('/api/v1/create_job_post/:id',authenticate_recruter,Recruter_controller.create_job_post)
    app.get('/api/v1/get_All_job_applies',authenticate_recruter,Recruter_controller.get_all_job_applies)
    app.post('/api/v1/recruiter/logout/:id',authenticate_recruter,Recruter_controller.logout)
}