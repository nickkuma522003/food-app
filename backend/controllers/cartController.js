const User = require("../models/userModel")

const addToCart = async (req, res) => {
  try {
    const { idMeal, strMeal, strMealThumb, price } = req.body;
    let user = await User.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    const existingItemIndex = user.cart.findIndex(item => item.idMeal == idMeal);


    if (existingItemIndex === -1) {

      const food = {
        idMeal,
        strMeal,
        price,
        strMealThumb
      };

      user.cart.push(food);

    } else {
     
      return res.json({ success: false, message: "Already in cart.", });
    }
    
    await user.save();
    res.json({ success: true, message: "Added to cart.", });
  } catch (error) {
    res.json({ success: false, message: "Error!" });
  }
};



const removeFromCart = async (req, res) => {
  try {
    let user = await User.findById(req.userId);


    if (!user) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    const existingItemIndex = user.cart.findIndex(item => item.idMeal == req.params.id);


    if (existingItemIndex == -1) {
      return res.json({ success: false, message: "food not found." })
    }
    user.cart.splice(existingItemIndex, 1)
    await user.save()

    res.json({ success: true, message: "food removed from cart." })


  } catch (error) {
    res.json({ success: false, message: "Error !" })
  }
}


const getCart = async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    res.json({ success: true, cart: user.cart })

  } catch (error) {
    res.json({ success: false, message: "Error !" })
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  getCart
}