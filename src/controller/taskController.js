const taskModel=require("../Model/taskModel")


exports.createTask=async(req,res)=>{
    try {
        const reqBody=req.body;
        reqBody.email=req.headers['email']
        const result=await taskModel.create(reqBody)
        res.status(200).json({ status: "Success",data: result});
    }catch (err){
        res.status(400).json({ status: "Fail",data: err});
    }
}


exports.deleteTask=async (req,res)=>{
    try {
        const id=req.params.id
        const Query={_id:id}
        const result=await taskModel.deleteOne(Query)
        res.status(200).json({ status: "Success",data: result});
    }catch (err) {
        res.status(400).json({ status: "Fail",data: err});
    }
}

exports.updateTask=async (req,res)=>{
    try {
        const id=req.params.id;
        const status=req.params.status;
        const Query={_id: id}
        const reqBody={status:status}
        const result=await taskModel.updateOne(Query,reqBody)
        res.status(200).json({ status: "Success",data: result});
    }catch (err) {
        res.status(400).json({ status: "Fail",data: err});
    }
}


exports.taskListByStatus=async (req,res)=>{
    try {
        const status=req.params.status
        let email=req.headers['email']
        const result=await taskModel.aggregate([
            {$match:{email:email,status:status}},
            {$project:{
                    _id:1,
                    title:1,
                    description:1,
                    status:1,
                    createdAt:{
                        $dateToString:{
                            date:"$createdAt",
                            format:"%d-%m-%Y"
                        }
                    }
                }}
        ])
        res.status(200).json({ status: "Success",data: result});
    }catch (err) {
        res.status(200).json({ status: "Fail",data: err});
    }

}

exports.taskStatusCount=async(req,res)=>{
    try {
        const email=req.headers['email'];
        const result=await taskModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({ status: "Success",data: result});
    }
catch (err) {
    res.status(200).json({ status: "Fail",data: err});
}
}