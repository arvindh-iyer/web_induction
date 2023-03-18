const Marks=require('../models/marks')
const Students=require('../models/students')

const studentMarks=async(req,res)=>{
    const {student}=req.body
    //console.log(student)
    let student_obj=await Students.findOne({regno:student})
    //console.log(student_obj)
    let mk_list=await Marks.find({student:student_obj._id})

    let marks_secured=0
    let total_count=0
    for(let i in mk_list){
        marks_secured+=mk_list[i].marks_secured
        total_count+=mk_list[i].total_marks
    }
    let percentage=marks_secured/total_count*100
    res.send({marks_secured,percentage})
}

module.exports=studentMarks