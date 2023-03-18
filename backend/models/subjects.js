const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    sub_code:String,
    sub_name:String
},{collection:'subjects'})

const subjects=mongoose.model('subjects',schema)

module.exports=subjects