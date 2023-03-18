const jwt=require('jsonwebtoken')
const verifyJwt=async(req,res)=>{
    const token=req.body.token
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    res.send({name:decoded.name})
}

module.exports=verifyJwt