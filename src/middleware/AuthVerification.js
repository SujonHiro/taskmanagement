const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
    let Token=req.headers['token'];

    jwt.verify(Token,process.env.SECRETKEY,function (err,decoded) {
        if(err){
            res.status(401).json({status:"Unauthorized"})
        }else {
            req.headers.email=decoded.data;
            next();
        }
    })
}