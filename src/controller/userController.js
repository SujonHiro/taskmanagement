const userModel=require("../Model/userModel")
const jwt = require("jsonwebtoken");


//Register Section
exports.register=async (req,res)=>{
   try {
       const reqBody=req.body;
       const result=await userModel.create(reqBody)
       res.status(200).json({status:"Success",data:result})
   }catch (err) {
       res.status(200).json({status:"Fail",data:err})
   }

}

//Login Section
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const result=await userModel.aggregate([
            {$match:{
                    email:email,
                    password:password
                }
            },
            {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
        ]).exec();

            if(result.length>0){
                let payload={exp:Math.floor(Date.now()/100)* (24*60*60),data:result[0].email}
                let token=jwt.sign(payload,process.env.SECRETKEY);
                res.status(200).json({ status: "Success",token,data: result[0]});
            }else {
                res.status(400).json({ status: "Unauthorized"});
            }

    }catch (err) {
        res.status(500).json({ status: "Error", message: err.message });
    }
}

//Profile Update

exports.profileUpdate=async(req,res)=>{
   try{
       const email=req.headers['email']
       const reqBody=req.body;
       const result= await userModel.updateOne({email: email},reqBody)
       res.status(200).json({ status: "Success",data: result});
   }catch (err){
       res.status(400).json({ status: "Fail",data: err});
   }

}

exports.profileDetailsGet=async(req,res)=>{
    try {
        const email=req.headers['email']
        const result=await userModel.aggregate([
            {$match:{email:email}},
            {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
        ]).exec();
        res.status(200).json({status: "Success",data: result});
    }catch (err){
        res.status(400).json({ status: "Fail",data: err});
    }
}