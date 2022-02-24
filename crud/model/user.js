const bcrypt = require('bcryptjs/dist/bcrypt');
const res = require('express/lib/response');
const mongoose = require('mongoose')
const jwt =require("jsonwebtoken")
// const User = require('../model/user')

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
    // user.tokens =user.tokens.concat({token})
    await user.save()
    return token;
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user = await User.findOne({email})
    

    if(!user){
        throw new Error("unable to login")
    }

    // const isMatch = await bcrypt.compare(password,user.password)

    // if(!isMatch){
    //     throw new Error("unable to login")
    // }
    return user
}

// userSchema.pre('save', async function (next) {
//     const user = this

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }

//     next()
// })
const User = mongoose.model('User', userSchema)
module.exports = new mongoose.model("User", userSchema)
