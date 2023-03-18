const Students=require('../models/students')

const displayStudents=async(req,res)=>{
    let l=await Students.find({})
    res.send(l)
}

module.exports=displayStudents