const Students=require('../models/students')

const addNewStudent=async(req,res)=>{
    const {name,batch,regno,semester}=req.body
    let studentExists=await Students.findOne({regno})
    if(studentExists) throw new Error("student already exists")

    let addStudent=await Students.create({name,batch,regno,semester})
    if(!addStudent) throw new Error("Failed to add new Student")

    res.send({output:"success"})
}

module.exports=addNewStudent