const Marks=require('../models/marks')
const Students=require('../models/students')
const Subjects=require('../models/subjects')

/*const fetchMarks=async(req,res)=>{
    const regno=req.body.student
    //console.log(regno)
    let student=await Students.findOne({regno})
    //console.log(student)
    let l=await Marks.find({student:student._id})
    
    //console.log(l)  
    for(let i in l){
        let sub_details=await Subjects.findOne({_id:l[i].subject})
        //console.log(sub_details)
        let obj={sub_code:sub_details.sub_code, sub_name:sub_details.sub_name, marks_secured:l[i].marks_secured, total_marks: l[i].total_marks}
        l[i]=obj
    //console.log(l)
    }
    res.send(l)
}*/

const fetchMarks=async(req,res)=>{
    //console.log(req.body)
    const {student,subject}=req.body

    let student_obj=await Students.findOne({regno:student})
    let subject_obj=await Subjects.findOne({sub_code:subject})
    //console.log(student_obj)
    //console.log(subject_obj)
    let mark=await Marks.findOne({$and:[{student:student_obj._id},{subject:subject_obj._id}]})
    //console.log(mark)
    if(!mark) res.send({marks_secured:null,total_marks:100})

    else res.send({marks_secured:mark.marks_secured, total_marks:mark.total_marks})
}

module.exports=fetchMarks