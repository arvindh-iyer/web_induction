/*const addMarks=async(req,res)=>{
    const {student,subject,marks}=req.body
    let std=await Students.findOne({regno:student})
    let sub=await Subjects.findOne({sub_code:subject})
    let marksExist=await Marks.findOne({$and:[{student:std._id},{subject:sub._id}]})
    let ans=""
    if(marksExist){
        ans=await Marks.updateOne({$and:[{student:std._id},{subject:sub._id}]},{marks_secured:marks})
    }
    else{
        ans=await Marks.create({student:std._id,subject:sub._id,marks_secured:marks,total_marks:100})
    }
    res.send(ans)

}*/
