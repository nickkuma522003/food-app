const Contact = require("../models/contactModel");
const User = require("../models/userModel");

const sendMessage = async(req,res) =>{
    try{
        const user = await User.findById(req.userId)

        if(!user){
            return res.json({success:false,message:"Please login."})
        }
        const {username,email,message} = req.body;

        if(!username || !email || !message){
            return res.json({success:false,message:"All fields are required."})
        }

        const newContact = new Contact({
            username,
            email,
            message,
            userId:user._id
        })

        await newContact.save()

        res.json({success:true,message:"Message sent."})

    }catch(error){
        res.json({success:false,message:"Error."})
    }
}

module.exports = {
    sendMessage
}