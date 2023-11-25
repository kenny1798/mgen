const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = parseInt(process.env.SERVER_PORT, 10);
const db = require('./models');
const fs = require('fs');
const fsx = require('fs-extra')
const https = require('https')
const http = require('http');
const {Server} = require("socket.io");
const multer = require('multer');
const path = require('path');
const { mgenSessions, mgenleads, users, wsauth} = require('./models');
const { validateToken, validateAdmin } = require('./middlewares/AuthMiddleware');
const { Client, LocalAuth, Contact } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('form_images'))


const server = http.createServer(app);

const serverOrigins = ["http://localhost:3000", "http://localhost:3002", "http://localhost:3003"];

const io = new Server(server, {
    cors:{
        origin: serverOrigins,
        methods: ["GET", "POST", "PUT"],
    }
});

app.use((req, res, next) => {
    req.io = io;
    return next();
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'form_images')
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null,"Mgen" + Date.now() + path.extname(file.originalname))
    }

});

const upload = multer({storage: storage});


// Routers
const usersRouter = require('./routes/user')
app.use("/api/user", usersRouter);

const validateRouter = require('./routes/validate');
app.use("/api/validate", validateRouter);

const mgenRouter = require('./routes/mgen');
app.use("/api/mgen", mgenRouter);

const msmartRouter = require('./routes/msmart');
app.use("/api/msmart", msmartRouter);

const adminRouter = require('./routes/admin');
app.use("/api/admin", adminRouter);

app.get('/test/wsauth', (req,res) => {
    res.json({test: 'test'})
    })

app.get('/whatsapp-auth/',validateToken, async (req,res) => {

    const username = req.user.username;
    const user = await users.findOne({where: {username: username}});
    const phoneNumber = await user.dataValues.phoneNumber;
    const checkPath =  `./.wwebjs_auth/session-${username}`;

    if(checkPath){
        const deletePath = () => fs.rm(checkPath, {recursive: true, force: true})
        if(deletePath){
            const client = new Client({
                authStrategy: new LocalAuth({clientId: username}),
                puppeteer: {headless: false,
                args: [ '--disable-gpu',
                 '--disable-setuid-sandbox',
                 '--no-sandbox'],
                 executablePath: process.env.EXECUTE_PATH}
                        });

            client.initialize();
            
            client.on('qr', (qr)  => {
                try{
                    io.emit('qrvalue', qr);
                    io.emit('message', 'QR Code is generated, scan now to get started.')
                    io.emit('btnhide', 'hide');
                    io.emit('loading', '');
                }
                catch (err){
                    io.emit({error: err.message})
                }      
                
            })

            const deleteSession = async () => {
                client.destroy();
                const delayRemove = () => {
                    fs.rmSync(checkPath, {recursive: true, force: true});
                    io.emit( 'message' , 'whatsApp number must be the same as profile phone number.');
                    io.emit( 'error' , 'Error: Connected whatsApp number is not the same as your profile phone number.');
                    io.emit('qrvalue', ''); 
                }
                
                setTimeout(delayRemove, 4000)
                     
            }

            client.on('ready', async () => {

                const clientNumber = client.info.wid.user;

                console.log(clientNumber)
                console.log(phoneNumber)

                if(clientNumber !== phoneNumber){

                    io.emit('qrvalue', '');
                    io.emit('message', 'Some error occured');
                    io.emit('loading', '');
                    setTimeout(deleteSession, 2000)
                
                }else{
                io.emit('qrvalue', '');
                io.emit('message', 'QR Scanned. Initializing authorized connection..' );
                io.emit('loading', 'load');
                    const checkAuth = async () => {
                        const sessionPath = String(`./.wwebjs_auth/session-${username}`);
                        const existPath = fs.existsSync(sessionPath);
                    if(existPath){

                        await wsauth.create({
                            username: username,
                            status: 'ready',
                            clientNumber: clientNumber
                        }).then(() => {
                            io.emit('message', 'Session Stored');
                            io.emit('loading', '');
                            io.emit( 'success' , 'WhatsApp connected successfully.');
                        })
                        
                    const delay = () =>{
                        client.destroy();
                        io.emit('status','ready')
                    }

                    setTimeout(delay, 2000)
                    }else{
                        io.emit({error: "Failed to connect whatsApp. Please try again."})
                    }
                    }
                    setTimeout(checkAuth, 3000)
                }

                
                });
            
        }
            

    }else{
        const client = new Client({
            authStrategy: new LocalAuth({clientId: username}),
            puppeteer: {headless: false,
            args: [ '--disable-gpu',
             '--disable-setuid-sandbox',
             '--no-sandbox'],
             executablePath: process.env.EXECUTE_PATH}
                    });

        client.initialize();
        
        client.on('qr', (qr)  => {
            try{
                io.emit('qrvalue', qr);
                io.emit('message', 'QR Code is generated, scan now to get started.')
                io.emit('btnhide', 'hide');
                io.emit('loading', '');
            }
            catch (err){
                io.emit({error: err.message})
            }      
            
        })

        const deleteSession = async () => {
            client.destroy();
            const delayRemove = () => {
                fs.rmSync(checkPath, {recursive: true, force: true});
                io.emit( 'message' , 'whatsApp number must be the same as profile phone number.');
                io.emit( 'error' , 'Error: Connected whatsApp number is not the same as your profile phone number.');
                io.emit('qrvalue', ''); 
            }
            
            setTimeout(delayRemove, 4000)
                 
        }

        client.on('ready', async () => {

            const clientNumber = client.info.wid.user;
            if(clientNumber !== phoneNumber){

                io.emit('qrvalue', '');
                io.emit('message', 'Some error occured');
                io.emit('loading', '');
                setTimeout(deleteSession, 2000)
            
            }else{
            io.emit('qrvalue', '');
            io.emit('message', 'QR Scanned. Initializing authorized connection..' );
            io.emit('loading', 'load');
                const checkAuth = async () => {
                    const sessionPath = String(`./.wwebjs_auth/session-${username}`);
                    const existPath = fs.existsSync(sessionPath);
                if(existPath){

                    await wsauth.create({
                        username: username,
                        status: 'ready',
                        clientNumber: clientNumber
                    }).then(() => {
                        io.emit('message', 'Session Stored');
                        io.emit('loading', '');
                        io.emit( 'success' , 'WhatsApp connected successfully.');
                    })
                    
                const delay = () =>{
                    client.destroy();
                    io.emit('status','ready')
                }

                setTimeout(delay, 2000)
                }else{
                    io.emit({error: "Failed to connect whatsApp. Please try again."})
                }
                }
                setTimeout(checkAuth, 3000)
            }

            
            });
    }            
            
            
                
    });

app.get('/admin-auth', validateAdmin, async (req,res) => {

        const admin = process.env.ADMIN_LOGIN;
                    const client = new Client({
                            authStrategy: new LocalAuth({clientId:admin}),
                            puppeteer: {headless: true,
                            args: [ '--disable-gpu',
                            '--disable-setuid-sandbox',
                            '--no-sandbox'],
                            executablePath: process.env.EXECUTE_PATH}
                        });
                
                        
                client.initialize();
            
                    client.on('qr', (qr)  => {
                        io.emit('qrvalue', qr);
                        io.emit('message', 'QR Code is generated, scan now to get started.')
                        io.emit('btnhide', 'hide');
                        io.emit('loading', ''); 
                               
                        
                    })
                    
                client.on('ready', () => {
                        io.emit('qrvalue', '');
                        io.emit('message', 'QR Scanned. Initializing authorized connection..' );
                        io.emit('loading', 'load');
                        const checkAuth = () => {
                            const sessionPath = String(`./.wwebjs_auth/session-${admin}`);
                        if(fs.existsSync(sessionPath)){
                            io.emit('loading', '');
                        const delay = () =>{
                            client.destroy();
                            io.emit('status','ready')
                        }
                        setTimeout(delay, 2000)
                        io.emit('message', 'Session Stored');
                        }
                        }
                        setTimeout(checkAuth, 3000)
                    });
                
                
        });

app.get('/admin/session/delete', validateAdmin, async (req,res) => {

 const admin = process.env.ADMIN_LOGIN;
 const sessionPath = String(`./.wwebjs_auth/session-${admin}`);
 const deletesession = fs.rmSync(sessionPath, {recursive: true});
    if(deletesession){
            res.json ({errmsg: 'Failed to delete session'})
            console.log("Unable to delete session");
        }else{
            res.json({msg: "Session deleted successfully"})
            console.log("Session deleted");
        }

});
 

// Start server
db.sequelize.sync().then(() => {
    server.listen(port, () =>{
                console.log("Server running on port " + port);
    })

})





