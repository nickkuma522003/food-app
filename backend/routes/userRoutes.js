const express = require('express')
const { register, login, getUser } = require('../controllers/userController')
const verifyToken = require('../middlewares/auth')
const userRouter = express.Router()


userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/",verifyToken,getUser)


module.exports = userRouter