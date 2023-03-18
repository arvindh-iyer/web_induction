const Students=require('../models/students')
const Marks=require('../models/marks')
//const Subjects=require('../models/subjects')

const dashboard=async(req,res)=>{
    let student_list=await Students.find({})
    for(let i in student_list){
        let temp_list=await Marks.find({student:student_list[i]._id})
        let marks=0
        let total=0
        for(let j in temp_list){
            marks+=temp_list[j].marks_secured
            total+=temp_list[j].total_marks
        }
        let percentage=marks*100/total
        percentage.toFixed(2)
        let obj={regno:student_list[i].regno,name:student_list[i].name,marks,percentage}
        student_list[i]=obj 
    }
    //console.log(student_list)
    res.send(student_list)
}

module.exports=dashboard