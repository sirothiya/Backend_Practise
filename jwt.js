const jwt= require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    //first check if the request has an authorization header
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({message:"Token not found"})
    // now extract  the token from the header
    const token=req.headers.authorization?.split(" ")[1];
    if(!token)return res.status(401).json({message:"Unauthorized"})

        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=decoded;
            next()
        }catch(err){
            console.log(err)
            return res.status(403).json({message:"Invalid token"})
        }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"300s"})
}



module.exports={jwtMiddleware, generateToken};