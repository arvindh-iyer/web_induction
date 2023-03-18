const Marks=require('../models/marks')
const Students=require('../models/students')
const Subjects=require('../models/subjects')

const updateMarks=async(req,res)=>{
    const {student,subject,marks}=req.body
    const student_obj=await Students.findOne({regno:student})
    const subject_obj=await Subjects.findOne({sub_code:subject})
    
    const objExists=await Marks.findOne({$and:[{student:student_obj._id},{subject:subject_obj._id}]})

    if(objExists){
        let o=await Marks.updateOne({_id:objExists._id},{marks_secured:marks})
        console.log(o)
        //o.save()
    }
    else{
        await Marks.create({student:student_obj._id, subject:subject_obj._id, marks_secured:marks, total_marks:100})
    }
    res.send({output:"success"})

}

module.exports=updateMarks