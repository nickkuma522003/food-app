const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    
  },

  message: {
    type: String,
    required: true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
  
});

 

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
