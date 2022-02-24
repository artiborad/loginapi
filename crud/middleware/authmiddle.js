const jwt = require("jsonwebtoken")
const User =require("../model/user")

const auth = async(req,res,next)=>{
    try{
        const token =req.header("Authorazation")
    }catch(e){
        res.status(401).send("error please authenticate")
    }

}