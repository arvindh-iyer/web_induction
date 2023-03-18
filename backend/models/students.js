const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:String,
    batch:Number,
    regno:String,
    semester:Number
},{collection:'students'})

const students=mongoose.model('students',schema)

module.exports=students