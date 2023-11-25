const express = require('express');
const app = express();
const router = express.Router();
const { msmart_team, msmartleads, users } = require('../models');
const nodemailer = require('nodemailer');
const { validateToken } = require('../middlewares/AuthMiddleware');
const { Op } = require('sequelize');

router.get('/test', validateToken, async (req,res) => {
  const username = req.user.username;
  try{
    const test = await msmartleads.findAndCountAll({where: {username:username, followUpDate:{[Op.ne]: null}}})
    res.json({test: test})
  }catch(error){
    res.status(404).json({error:"Unable to access to database"})
    console.log(error)
  }
  

})

router.put('/test', async(req,res) => {
  const today = Date.now();
  await msmartleads.update({leadStatus:'Follow Up', updatedAt:today}, {where:{id:4}}).then(() => {
    res.send('success')
  })
})

router.get('/stat', validateToken, async (req,res) => {
  const username = req.user.username;
  try{
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const mindate = `${year}-${month}-${day} 00:00:00`;
    const maxdate = `${year}-${month}-${day} 23:59:59`;
    const listOfLeads = await msmartleads.findAndCountAll({where: {username:username}});
    const followUpLeads = await msmartleads.findAndCountAll({where: {username:username, followUpDate:{[Op.between]: [mindate, maxdate]}}});
    const latestUpload = await msmartleads.findOne({where:{username:username}, order: [['id', 'DESC']]});
    const latestEngaged = await msmartleads.findOne({where:{username:username}, order: [['updatedAt', 'DESC']]});
    res.status(200).json({totalLeads:listOfLeads.count, followUpLeads:followUpLeads.count, latestUpload:latestUpload.leadPhoneNumber, latestEngaged:latestEngaged.leadPhoneNumber});
  }catch(error){
    res.status(404).json({error:"Unable to access to database"})
    console.log(error)
  }

})

router.get('/leads/all', validateToken, async (req,res) => {
  const username = req.user.username;
  try{
    const listOfLeads = await msmartleads.findAll({where: {username:username}});
    res.status(201).json(listOfLeads);
  }catch(error){
    res.status(404).json({error:"Unable to access to database"})
    console.log(error)
  }
  

})

router.get('/lead/:id', validateToken, async (req,res) => {
  const lid = req.params.id;
  const username = req.user.username;
  try{
    const singleLead = await msmartleads.findOne({where: {username:username, id:lid}});
    res.status(201).json({db: singleLead});
  }catch(error){
    res.status(404).json({error:"Unable to access to database"})
    console.log(error)
  }
  

})

router.post('/lead', validateToken, async (req,res) => {
  const username = req.user.username;
  const {leadName, leadPhoneNumber, leadSource} = req.body;
  try{
    await msmartleads.create({
      username: username,
      leadName: leadName,
      leadPhoneNumber: leadPhoneNumber,
      leadSource: leadSource,
      leadStatus: 'No Action',
      leadPresent: 0,

    }).then(() => {
      res.status(201).json({status:'Contact saved successfully'})
    })

  }catch(err){
    res.status(404).json({error:"Unable to save contact"})
    console.log(err)
  }
})



module.exports = router;