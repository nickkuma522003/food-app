const express = require('express')
const verifyToken = require('../middlewares/auth')
const { placeOrder, verifyOrder, userOrders } = require('../controllers/orderContoller')
const orderRouter = express.Router()


orderRouter.post("/place",verifyToken,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.get("/all",verifyToken,userOrders)


module.exports = orderRouter