const Subjects=require('../models/subjects')

const displaySubjects=async(req,res)=>{
    let l=await Subjects.find({})
    res.send(l)
}

module.exports=displaySubjects