const Candidate_model=require('../Modles/Candidate_model')
const bcrypt=require('bcryptjs')
const Jobpost_model=require('../Modles/Jobpost_Model')
const {jwt_sign_candidate}=require('../Middleware/Middleware')
const Jobapplies_schema = require('../Modles/Jobapplies_model')


exports.Candidate_Signup=async(req,res)=>{
    try{
        const {email,password,student_name,}=req.body;
        const check_email=await Candidate_model.findOne({Email:email})
        if(check_email){
            return res.status(401).send({code:401,message:"Email Already in use"})
        }
        else{
            const salt=10;
            const hash_password=await bcrypt.hash(password,salt) 
            console.log
            const candidate_signup=await Candidate_model.create({
                Email:email,
                Password:hash_password,
                student_name:student_name
            })
            return res.status(201).send({code:201,message:"candidate Signup successfully"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.Candidate_login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const check_email=await Candidate_model.findOne({Email:email,status:'ACTIVE'})
        if(check_email){
            const create_token=await jwt_sign_candidate(email)
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

exports.get_all_job_post=async(req,res)=>{
    try{
        const get_All_jobs=await Jobpost_model.find({status:"ACTIVE"})
        return res.status(200).send({code:200,message:"All jobs",data:get_All_jobs})
    }
    catch(err){
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.applies_job=async(req,res)=>{
    try{
        const candidate_id=req.params.id
        const{Jobpost_id,Position_name,job_posted_by,Job_title,Job_Description}=req.body
        const check_candidate=await Candidate_model.findOne({status:"ACTIVE",_id:candidate_id})
        if(check_candidate){
            const check_apply=await Jobapplies_schema.findOne({Jobpost_id:Jobpost_id,status:'ACTIVE'})
            if(check_apply){
                return res.status(400).send({code:400,message:"You have Already Applied for the Job"})
            }
            else{
                const apply_job=await Jobapplies_schema.create({
                    Jobpost_id:Jobpost_id,
                    Position_name:Position_name,
                    job_posted_by:job_posted_by,
                    applied_by_id:candidate_id,
                    Job_title:Job_title,
                    Job_Description:Job_Description
                })
                return res.status(200).send({code:200,message:"Applied successfully!!"})
            }
        }
        else{
            return res.status(401).send({code:401,message:"Unauth User"})
        }
    }
    catch(err){
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.logout=async(req,res)=>{
    const _id=req.params.id
    const check_candidate=await Candidate_model.findOne({_id:_id})
    if(check_candidate){
        return res.status(200).send({code:200,message:"Logout Successfully"})
    }
    else{
        return res.status(401).send({code:401,message:"Unauth User"})
    }
}