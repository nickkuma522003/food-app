const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel')
const User = require('../models/userModel')


const placeOrder = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
  
    try {
      const newOrder = new Order({
        userId: req.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address
      });
      await newOrder.save();
  
      await User.findByIdAndUpdate(user._id, { cart: [] });
  
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.strMeal,
           
          },
          unit_amount: item.price * 100 
        },
        quantity: 1
      }));
  
      // Add delivery charges
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charges"
          },
          unit_amount: 0
        },
        quantity: 1
      });
  
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${process.env.ORIGIN}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${process.env.ORIGIN}/verify?success=false&orderId=${newOrder._id}`,
      });
     
      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async(req,res)=>{
    try{
        const {orderId,success} = req.body;

        if(success=="true"){
            await Order.findByIdAndUpdate(orderId,{payment:true,status:"Food Delivered."})
            return res.json({success:true,message:"Paid"})
        }else{
            await Order.findByIdAndDelete(orderId)
        }   return res.json({success:false,message:"Not Paid."})


    }catch(error){
        res.json({success:false,error:"Error"})
    }
}

const userOrders = async(req,res)=>{
    try{

        const user = await User.findById(req.userId)

        if(!user){
            return res.json({success:false,message:"user not found."})
        }
        const orders = await Order.find({userId:user._id})
        
        res.json({success:true,orders})

    }catch(error){
        res.json({success:false,message:"Error"})
    }
}
  

module.exports = {
    placeOrder,
    verifyOrder,
    userOrders
}