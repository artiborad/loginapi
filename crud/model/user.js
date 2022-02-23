const bcrypt = require('bcryptjs/dist/bcrypt');
const res = require('express/lib/response');
const mongoose = require('mongoose')
const jwt =require("jsonwebtoken")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = async function(){
    const user =this
    const token = jwt.sign({_id:user._id.toString()},"thisisnewtoken")
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user = await User.findOne({email})
    

    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.comapare(password,user.password)

    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}
module.exports = new mongoose.model("User", userSchema)
