const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router=require("./src/routes/api")
require("dotenv").config()

const cors=require("cors")
const helmet=require("helmet")
const hpp=require("hpp")
const exMoSanitize= require("express-mongo-sanitize");


app.use(helmet())
app.use(cors())
app.use(hpp())
app.use(exMoSanitize())

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))

mongoose.connect(process.env.DBURL+"/"+process.env.DBName)
    .then(()=>console.log("DataBase Connected"))
    .catch(err=>console.log(err))

app.use("/api/v1",router)

app.use("*",(req,res)=>{
    res.status(404).json({status:'Fail',data:"Not Found"})
})

module.exports = app;