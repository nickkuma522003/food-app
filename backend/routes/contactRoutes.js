const express = require('express')
const verifyToken = require('../middlewares/auth')
const { sendMessage } = require('../controllers/contactController')
const contactRouter = express.Router()


contactRouter.post("/add",verifyToken,sendMessage)



module.exports = contactRouter