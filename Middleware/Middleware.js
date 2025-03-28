const jwt=require('jsonwebtoken')
require('dotenv').config()
const secret_key=process.env.SECRET_KEY_candidate;
const secret_key_recruter=process.env.SECRET_KEY_recruter

const jwt_sign_candidate=async(payload)=>{
    let payloads={
        username:payload
    }
    const options={
        expiresIn:'1h'
    }
    const token=jwt.sign(payloads,secret_key,options)
    return token;
}
const jwt_sign_recruter=async(payload)=>{
    let payloads={
        username:payload
    }
    const options={
        expiresIn:'1h'
    }
    const token=jwt.sign(payloads,secret_key_recruter,options)
    return token;
}
const authenticate_user=async(req,res,next)=>{
    console.log(req.headers)
    const token=req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.status(401).send({code:401,message:'No Token Present'})
    }
    jwt.verify(token,secret_key,(err,user)=>{
        if(err){
            return res.status(401).send({code:401,message:"Invalid Token="})
        }
        req.user=user;
        next()
    })
}


const authenticate_recruter=async(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1]
    
    if(!token){
        return res.status(401).send({code:401,message:'No Token Present'})
    }
    jwt.verify(token,secret_key_recruter,(err,user)=>{
        if(err){

            return res.status(401).send({code:401,message:"Invalid Token"})
        }
        req.user=user;
        next()
    })
}



module.exports={jwt_sign_candidate,jwt_sign_recruter,authenticate_user,authenticate_recruter}