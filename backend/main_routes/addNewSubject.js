const Subjects=require('../models/subjects')

const addNewSubject=async(req,res)=>{
    const {sub_code,sub_name}=req.body
    let subExists=await Subjects.findOne({sub_code})
    if(subExists) throw new Error("subject already exists")

    const addSubject=Subjects.create({sub_code,sub_name})
    if(!addSubject) throw new Error("could not add subject")

    res.send({output:"success"})
}

module.exports=addNewSubject