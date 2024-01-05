const mongoose=require("mongoose")

const TaskSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type: String,required:true},
    status:{type:String},
    email:{type:String},
    createdAt:{type:Date,default:Date.now()}
},{versionKey:false})

const TaskModel=mongoose.model("tasks",TaskSchema)

module.exports=TaskModel