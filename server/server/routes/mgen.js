const express = require('express');
const router = express.Router();
const { Client, LocalAuth} = require('whatsapp-web.js');
const {phoneNumberFormatter} = require('../middlewares/WhatsAppFormatter')
const path = require('path');
const fs = require('fs');
const { mgenSessions, mgenleads, users, mgenqueue } = require('../models');
const multer = require('multer');
const { validateToken } = require('../middlewares/AuthMiddleware');
require('dotenv').config();


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './form_images')
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null,"Mgen" + Date.now() + path.extname(file.originalname))
    }

});

const limitFileSize = 3 * 1024 * 1024

const upload = multer({storage: storage, limits: {fileSize:limitFileSize}, 
    fileFilter:(req, file, cb) => {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
            cb(null,true)
        }else{
            cb(null, false)
            return cb(new Error('Only .jpg, .jpeg and .png files are allowed'))
        }
    }})

router.get('/get/:session_client', validateToken, async (req,res) => {
    try{
    const username = req.user.username;
    const clientLink = req.params.session_client;
    const session = await mgenSessions.findOne({where: {session_client:clientLink}});
    res.json(session)
    }catch(error){
        res.json({error: error.message})
    }
});

//Get Mgen Page
router.get('/get-data/:session_client', async (req,res) => {
    const session_client = req.params.session_client;
    const session = await mgenSessions.findOne({where: {session_client:session_client}});
    const username = session.username;
    const user = await users.findOne({where: {username:username}});
    try{
        res.json({session:session, user:user});
    }catch(error){
        res.json({error: error})
    }

});

//Send WhatsApp Message
router.post('/send-message/:session_client', async (req,res) => {

    try{
    const session_client = req.params.session_client;
    const {leadName, leadPhoneNumber} = await req.body;
    const checkNumber = JSON.stringify(leadPhoneNumber);
    const numberLength = checkNumber.length;
    const session = await mgenSessions.findOne({where: {session_client:session_client}});
    const message = await session.whatsapp_text;
    const username = await session.username;
    const lead = await mgenleads.findOne({where: {leadPhoneNumber:leadPhoneNumber}});
    const leadSession = await mgenleads.findOne({where: {session:session_client}});
    const user = await users.findOne({where: {username:username}});
    const plusContact = user.contacts + 1;
    let currentQueue;
    let addQueue;
    const queue = await mgenqueue.findOne({limit: 1, where:{username: username}, order: [['queue', 'DESC']], attributes: ['queue']});


    if(!leadName || !leadPhoneNumber){
        res.json({error: "All fields cannot be blank"})
    }else if(numberLength<12 || numberLength>13){
        res.json({error: "WhatsApp number not valid"})
    }else if(lead && leadSession){
        res.json({error:"WhatsApp number already submitted"})
    }else{

        if(!queue){
            currentQueue = 0;
            addQueue = 1;
        }else{
            currentQueue = queue.dataValues.queue;
            addQueue = await currentQueue + 1;
        }

        await mgenleads.create({
            user: username,
            session: session_client,
            leadName: leadName,
            leadPhoneNumber: leadPhoneNumber    
        }).then( async () => {

            const currentLead = await mgenqueue.create({
                leadName: leadName,
                leadPhoneNumber: leadPhoneNumber,
                username: username,
                session_client: session_client,
                queue: addQueue
            }).then((response) => {

                if(response){
                res.json({status: "success", msg: "Your details submitted successfully.", error: ""});
                users.update({contacts:plusContact}, {where: {username: username}}).then(async () => {
                    
                    const sendMessage = () => {
                        const client = new Client({
                            authStrategy: new LocalAuth({clientId: username}),
                            puppeteer: {headless: false,
                            args: [ '--disable-gpu',
                             '--disable-setuid-sandbox',
                             '--no-sandbox'],
                             executablePath: process.env.EXECUTE_PATH}
                                    });

                        client.initialize();

                        client.on('ready', () => {
                            const formattedNumber = phoneNumberFormatter(leadPhoneNumber);
                            client.sendMessage(formattedNumber, message).then(async () => {                                          
                                console.log('A text message was sent to ' + leadPhoneNumber)
                                await mgenqueue.destroy({where:{session_client: session_client, leadPhoneNumber: leadPhoneNumber}})
                                const delayDestroy = () => {
                                    client.destroy();
                                }
                                setTimeout(delayDestroy, 1000);
                            })
                        })
                    }

                    setTimeout(sendMessage, currentQueue * 30000);
        
                })
            }
                })

        })
 
     
    }
    }catch(error){
        console.log(error)
    }

    
    });

router.post('/whatsapp-auth', validateToken, upload.single('form_image'), async (req,res) => {
    if(!req.file){
        res.statusCode = 400;
        res.send({code : err.code});
    }else{
    try{
    const username = req.user.username;
    const session_client = req.body.session_client;
    const form_title = req.body.form_title;
    const form_body = req.body.form_body;
    const whatsapp_text = req.body.whatsapp_text;
    const form_image = req.file.filename;
        mgenSessions.create({
            username:username,
            session_client: session_client,
            form_title:form_title,
            form_body: form_body,
            form_image: form_image,
            whatsapp_text: whatsapp_text
        }).then(() => {
            res.json({message:'Form created successfully'})
        })
    }catch(error){
        res.json({error:'There is an error while creating form, please try again.'})
    } 
    } 
});

router.put('/form/update', validateToken, upload.single('form_image') , async (req,res) => {
    try{
        const username = req.user.username;
        const session_client = req.body.session_client;
        const form_title = req.body.form_title;
        const form_body = req.body.form_body;
        const whatsapp_text = req.body.whatsapp_text;
        const session = await mgenSessions.findOne({where: {session_client:session_client}});
        const image = session.form_image
        let form_image;
        if(req.file){
        form_image = req.file.filename;
        const filePath = `./form_images/${image}`;
        fs.unlinkSync(filePath);
        }else{
        form_image = image;
        }
            await mgenSessions.update({
                username:username,
                session_client: session_client,
                form_title:form_title,
                form_body: form_body,
                form_image: form_image,
                whatsapp_text: whatsapp_text
            }, {where: {session_client: session_client}}).then(() => {
                res.json({message:'Form updated successfully'})
            })

    }catch(error){
        res.json({error:'There is an error while updating form, please try again.'})
    }
    

});

router.use(function (err,req,res,next) {
    if (err instanceof multer.MulterError){
        res.statusCode = 400;
        res.send({code : err.code});
    }else if (err){
        if(err.message === "FILE_MISSING"){
            res.statusCode = 400;
            res.send({code : "FILE_MISSING"});
        }else{
            res.statusCode = 500;
            res.send({code : "GENERIC_ERROR"});
        }
    }
});

router.get("/session/delete/:clientLink", validateToken, async (req, res) => {

        });

router.get("/getLeads/:session_client", validateToken, async (req, res) => {
    const session = req.params.session_client;
    const listOfLeads = await mgenleads.findAll({where: {session:session}});
    const count = listOfLeads.length;
    res.json({leads: listOfLeads, count: count});
        });

router.get('/getleads', validateToken, async (req,res) => {
    const username = req.user.username;
    const contacts = await mgenleads.findAll({where:{user:username}});
    res.json({contacts: contacts.length});
});

router.get('/getallcontacts', validateToken, async (req,res) => {
    const username = req.user.username;
    const contacts = await mgenleads.findAll({where:{user:username}});
    res.json(contacts);
});

router.get('/getSession', validateToken, async (req,res) => {
    const username = req.user.username;
    const session = await mgenSessions.findAll({where: {username:username}});
    res.json(session);
})

module.exports = router;
    