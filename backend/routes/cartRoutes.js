const express = require('express')
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')
const verifyToken = require('../middlewares/auth')
const cartRouter = express.Router()


cartRouter.post("/add",verifyToken, addToCart)
cartRouter.delete("/remove/:id",verifyToken,removeFromCart)
cartRouter.get("/",verifyToken,getCart)

module.exports = cartRouter