const Recruter_model=require('../Modles/Recruter_mode')
const bcrypt=require('bcryptjs')
const{jwt_sign_recruter}=require('../Middleware/Middleware')
const Jobpost_model=require('../Modles/Jobpost_Model')
const Jobapplies_schema = require('../Modles/Jobapplies_model')
const jwt=require('jsonwebtoken')
exports.recruiter_signup=async(req,res)=>{
    try{
        const {email,password,recuriter_name,}=req.body;
        const check_email=await Recruter_model.findOne({Email:email})
        if(check_email){
            return res.status(401).send({code:401,message:"Email Already in use"})
        }
        else{
            const salt=10;
            const hash_password=await bcrypt.hash(password,salt) 
            const candidate_signup=await Recruter_model.create({
                Email:email,
                Password:hash_password,
                recruiter_name:recuriter_name
            })
            return res.status(201).send({code:201,message:"Recuriter Signup successfully"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.recruiter_login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const check_email=await Recruter_model.findOne({Email:email,status:'ACTIVE'})
        if(check_email){
            const create_token=await jwt_sign_recruter(email)
                let datas={ 
                    token:create_token
                }
                const comparePassword=await bcrypt.compare(password,check_email.Password)
                if(comparePassword){
                    return res.status(200).send({code:200,message:"Login Successfully",data:datas})
                }
                else{
                    return res.status(401).send({code:401,message:"Wrong Password"})
                }
        }
        else{
            return res.status(401).send({code:401,message:"Email Not registered"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.create_job_post=async(req,res)=>{
    try{
        const _id=req.params.id;
        const{Position_name,role,Job_Title,Job_Description}=req.body
        if(role=='Recruiter'){
                const check_recruter=await Recruter_model.findOne({_id:_id,status:"ACTIVE"})
                if(check_recruter){
                    const check_job=await Jobpost_model.findOne({Position_name:Position_name,status:"ACTIVE"})
                    if(check_job){
                        return res.status(400).send({code:400,message:"This Job post already created"})
                    }
                    const create_job_post=await Jobpost_model.create({
                        Job_Title:Job_Title,
                        Job_Description:Job_Description,
                        Position_name:Position_name,
                        Posted_by_id:_id,
                    })
                    return res.status(201).send({code:201,message:"Job post created successfully"})
                }
                else{
                    return res.status(401).send({code:401,message:"You are not Admin"})
                }
        }
        else{
            return res.status(401).send({code:401,message:"You are not authozied to create job"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_all_job_applies=async(req,res)=>{
    const get_all_applies=await Jobapplies_schema.find({status:'ACTIVE'})
    return res.status(200).send({code:200,message:"Data Fetched",data:get_all_applies})
}
exports.logout=async(req,res)=>{
    const _id=req.params.id
    const check_recruter=await Recruter_model.findOne({_id:_id})
    if(check_recruter){
        jwt
        return res.status(200).send({code:200,message:"Logout Successfully"})
    }
    else{
        return res.status(401).send({code:401,message:"Unauth User"})
    }
}