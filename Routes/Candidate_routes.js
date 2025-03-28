const express=require('express')
const app=express.Router()
const candidate_controller=require('../Controllers/Candidate_controller');
const {authenticate_user}=require('../Middleware/Middleware')


module.exports=app=>{
    app.post('/api/v1/candidate/signup',candidate_controller.Candidate_Signup)
    app.post('/api/v1/candidate/login',candidate_controller.Candidate_login)
    app.get('/api/v1/get_All_job_post',authenticate_user,candidate_controller.get_all_job_post)
    app.post('/api/v1/apply_jobs/:id',authenticate_user,candidate_controller.applies_job)
    app.post('/api/v1/candidate_logout/:id',authenticate_user,candidate_controller.logout)
};

