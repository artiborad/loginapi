const express = require("express")
// const mongodb = require("mongodb")
const mongoose = require("mongoose")
const app = express()
// const MongoClient= mongodb.MongoClient
const authRoute = require("./router/auth")
const jwt=require("jsonwebtoken")
// const bodyParser = require('body-parser');
const dbURI="mongodb+srv://arti:arti1234@cluster0.yj4az.mongodb.net/loginapi?retryWrites=true&w=majority"

// const  dbURI = "mongodb+srv://artiborad1:Y+W!2Gd/UFic?4R@cluster0.cgo68.mongodb.net/loginapi?retryWrites=true&w=majority"
app.use(express.json())
app.use("/auth",authRoute)
// app.use(bodyParser.json())

mongoose.connect(dbURI , {useNewUrlParser: true}).then(()=>{
    console.log("connection sucessfully")
}).catch((error)=>{
    console.log("not connnected"+error)
})
const db = mongoose.connection

// db.on("error", (err)=>{console.error(err)})
db.on("open", () => {
    console.log("DB started successfully")})

app.listen(9000, () => {console.log("Server started: 9000")})

const myFun = async ()=>{
    const token = jwt.sign({ _id: "abc123"},"thisisnewtoken")
    console.log("token genrated")
    console.log(token)

    const data = jwt.verify(token,"thisisnewtoken")
    console.log(data)
}
myFun()