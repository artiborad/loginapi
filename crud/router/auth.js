const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const User = require('../model/user')
const mongoose =require("mongoose")
const bcrypt = require("bcrypt")

router.post("/signup",(req,res,next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }else{
                const user =new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
            });
            user.save().then(result=>{
                console.log(result)
                res.status(201).json({
                    message :"User Created"
                });
            }).catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                });
            });
            }
    })
   }
});
})
    
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

router.post("/signin", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });
  


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

router.get("/",async(req,res)=>{
  try{
    const data = await User.find({})
    res.send(data)
  }catch(e){
    res.send(e)
  }
})


// router.patch("/:id",async(req,res)=>{
//   try{
//     const data = await User.findById(req.params.id)
//     const a1= await data.save()
//     res.json(a1)
//   }catch(e){
//     res.send(e)
//   }
// })

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/login",async (req,res)=>{
  try{

    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    // res.send(user,token)
    res.send({user,token})
  }catch(e){
      console.log(e)
    res.status(400).send()
  }

})

module.exports = router;