const mongoose=require('mongoose')

const connection=mongoose.connect('mongodb://127.0.0.1:27017/SquareBoat_Task_App')
.then(()=>{
    console.log('Database Connected Succesfully!!')
})
.catch((err)=>{
    console.log('Err',err)
})

module.exports=connection