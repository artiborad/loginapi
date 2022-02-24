const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const User = require('../model/user')
// const mongoose =require("mongoose")
// const bcrypt = require("bcrypt")

// router.post("/signup",(req,res,next)=>{
//     User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         bcrypt.hash(req.body.password,10,(err,hash)=>{
//             if(err){
//                 return res.status(500).json({
//                     error:err
//                 });
//             }else{
//                 const user =new User({
//                     _id:new mongoose.Types.ObjectId(),
//                     email:req.body.email,
//                     password:hash
//             });
//             user.save().then(result=>{
//                 console.log(result)
//                 res.status(201).json({
//                     message :"User Created"
//                 });
//             }).catch(err=>{
//                 console.log(err)
//                 res.status(500).json({
//                     error:err
//                 });
//             });
//             }
//     })
//    }
// });
// })
    
// router.post('/signup', (req, res) => {
//     bcrypt.hash(req.body.password,rounds,(error,hash)=>{
//         if(error){res.status(500).json(error)}
//         else {
//             const newUser =User({email:req.body.email,password: hash})
//             newUser.save().then(user=>res.status(200).json(user)).catch(error=>{
//                 res.status(500).json(error)
//             })

//         }
//     })
// });

// router.post("/signup", (req, res, next) => {
//     User.find({ email: req.body.email })
//       .exec()
//       .then(user => {
//         if (user.length >= 1) {
//           return res.status(409).json({
//             message: "Mail exists"
//           });
//         } else {
//           bcrypt.hash(req.body.password, 10, (err, hash) => {
//             if (err) {
//               return res.status(500).json({
//                 error: err
//               });
//             } else {
//               const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 email: req.body.email,
//                 password: hash
//               });
//               user
//                 .save()
//                 .then(result => {
//                   console.log(result);
//                   res.status(201).json({
//                     message: "User created"
//                   });
//                 })
//                 .catch(err => {
//                   console.log(err);
//                   res.status(500).json({
//                     error: err
//                   });
//                 });
//             }
//           });
//         }
//       });
//   });
  


// router.post("/",async(req,res)=>{
//     const user= new User({
//       email:req.body.email,
//       password: req.body.password
//     })
//     // console.log(req.body)
//     try{
//       const a1= await user.save()
//       res.json(a1)
//       // res.status(201).send(user)
//     }catch(e){
//       res.send(e)
//     }
// })

// router.get("/",async(req,res)=>{
//   try{
//     const data = await User.find({})
//     res.send(data)
//   }catch(e){
//     res.send(e)
//   }
// })


// router.patch("/:id",async(req,res)=>{
//   try{
//     const data = await User.findById(req.params.id)
//     const a1= await data.save()
//     res.json(a1)
//   }catch(e){
//     res.send(e)
//   }
// })



// router.post("/",async (req,res)=>{
//   try{

//     const user = await User.findByCredentials(req.body.email,req.body.password)
//     const token = await user.generateAuthToken()
//     res.json(user,token)
//   }catch(e){
//     res.status(400).send()
//   }

// })

module.exports = router;