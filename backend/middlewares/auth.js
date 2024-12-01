const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next) =>{
    try{

        const token  = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.json({success:false,message:"Token missing."})   
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

         req.userId = decoded.id
         next()

    }catch(error){
        res.json({success:false,message:"Error"})
    }
}

module.exports = verifyToken