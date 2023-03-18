const mongoose=require('mongoose')
const students=require('./students')
const subjects=require('./subjects')

const schema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:students 
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:subjects 
    },
    marks_secured:{
        type:Number
    },
    total_marks:Number

},{collection:'marks'})

const marks=mongoose.model('marks',schema)

module.exports=marks