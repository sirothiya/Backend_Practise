const jwt= require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    // now extract  the token from the header
    const token=req.headers.authorization?.split(" ")[1];
    if(!token)return res.status(401).json({message:"Unauthorized"})

        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            res.user=decoded;
            next()
        }catch(err){
            console.log(err)
            return res.status(403).json({message:"Invalid token"})
        }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"30"})
}



module.exports={jwtMiddleware, generateToken};