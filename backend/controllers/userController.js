const User = require("../models/userModel");
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async(req,res) =>{
    try{
        const {fullName,email,password} = req.body;
       
        const userExist = await User.findOne({email})

        if(userExist){
            return res.json({success:false,message:"Please login."})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        }

        if(password.length<6){
            return res.json({success:false,message:"Password length should be atleast 6 characters long."})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        let newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        await newUser.save()

        const user = {
            fullName:newUser.fullName,
            email:newUser.email,
            cart:[]
        } 

        const token = createToken(user._id)
        
        res.json({success:true,token,message:"Account created.",user})
        

    }catch(error){
        return res.json({success:false,message:"Error."}) 
    }
}

const login = async(req,res) =>{
    const {email,password} = req.body;
 try{
    const userExist = await User.findOne({email})

    if(!userExist){
        return res.json({success:false,message:"Wrong email or password."})
    }

    const isMatch = await bcrypt.compare(password,userExist.password)

    if(!isMatch){
        return res.json({success:false,message:"Wrong email or password."})
    }
    const token = createToken(userExist._id)
    const user = {
        fullName:userExist.fullName,
        email:userExist.email,
        cart:userExist.cart
    }
    res.json({success:true,token,message:"Login successfull.",user})     

    }catch(error){
        return res.json({success:false,message:"Error."})    
    }
}

const getUser = async(req,res)=>{
    try{

        const user = await User.findById(req.userId).select("-password")
        if(!user){
            res.json({success:false,message:"User not found."})
        }
        res.json({success:true,user})

    }catch(error){
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

module.exports = {
    register,
    login,
    getUser
}