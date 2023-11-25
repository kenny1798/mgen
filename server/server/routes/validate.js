const express = require('express');
const router = express.Router();
const { users, admin } = require('../models')
const { phoneNumberFormatter } = require('../middlewares/WhatsAppFormatter');
const { validateToken} = require('../middlewares/AuthMiddleware');
const { sign } = require('jsonwebtoken');
const fs = require('fs')
const { Client, LocalAuth } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config()

router.get("/requestverification", validateToken, async (req, res) =>{

    try{
    const username = req.user.username;
    const user = await users.findOne ({where: {username: username}});
    const userEmail = String(user.email);
    const admin_email = String(process.env.ADMIN_EMAIL);
    const admin_pass = String(process.env.ADMIN_EMAIL_PASS);
    const message = "Your Verification Code is " + String(user.verificationCode);
    const resMsg = `An email has been sent to ${user.email}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: admin_email,
          pass: admin_pass
        }
      });
      
      
    const mailOptions = {
        from: 'admin@mirads.io',
        to: userEmail,
        subject: 'mirads.io verification code',
        text: message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.status(202).json({message: resMsg})
        }
      });

    }catch(error){
        console.log(error)
    }

    
})

router.put("/validateuser", validateToken, async (req,res) =>{
    const username = req.user.username;
    const {verificationCode} = req.body;
    if(!verificationCode){
       res.json({error: "Verification Code cannot be blank"})
    }else{

    
    const validate = 1;
    const user = await users.findOne ({where: {username: username}});
    const userVerificationCode = user.verificationCode;
    if(verificationCode == userVerificationCode){
        await users.update({isValidate: validate}, {where: {username: username}});
        const validToken = sign({id: user.id, isValidate: user.isValidate}, process.env.JWT_ACCESS)
        const loginUser = user.username;
        res.json({success: "User verified successfully", valToken: validToken})
    }else if(verificationCode != userVerificationCode){
        res.json({error: "Invalid Verification Code"})
    }else{
        res.json({error: "Unable to verify user to the server"});
    }
}
})

module.exports = router;