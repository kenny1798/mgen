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
const { mgenSessions, mgenleads, users} = require('./models');
const { validateToken, validateAdmin } = require('./middlewares/AuthMiddleware');
const { Client, LocalAuth, Contact } = require('whatsapp-web.js');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('form_images'))


const server = http.createServer(app);

const serverOrigins = ["http://localhost:3000", "http://localhost:3001"];

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
const validateRouter = require('./routes/validate');
app.use("/api/validate", validateRouter);

const mgenRouter = require('./routes/mgen');
app.use("/api/mgen", mgenRouter);

const msmartRouter = require('./routes/msmart');
app.use("/api/msmart", msmartRouter);

app.get('/', async (req,res) => {
    try{
        const response = await fetch('http://localhost:3001/test/wsauth')
        const json = await response.json();

        console.log(json)
    }catch(error){
        console.log(error.response.body)
    }
})

app.get('/whatsapp-auth/',validateToken, async (req,res) => {

    const username = req.user.username;
    
    const client = new Client({
            authStrategy: new LocalAuth({clientId: username}),
            puppeteer: {headless: true,
            args: [ '--disable-gpu',
             '--disable-setuid-sandbox',
             '--no-sandbox'],
             executablePath: process.env.EXECUTE_PATH}
                    });

    client.initialize();

    const checkPath =  String(`./.wwebjs_auth/session-${username}`);
    if(checkPath){
        const removePath = () =>{fs.rmSync(checkPath, {recursive: true});} 
        if (removePath){
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
        }else{
            console.log('cant overwrite session')
        }

    }else{
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
    }            
            client.on('ready', () => {
                io.emit('qrvalue', '');
                io.emit('message', 'QR Scanned. Initializing authorized connection..' );
                io.emit('loading', 'load');
                    const checkAuth = () => {
                        const sessionPath = String(`./.wwebjs_auth/session-${username}`);
                    if(fs.existsSync(sessionPath)){
                        io.emit('message', 'Session Stored');
                        io.emit('loading', '');
                    const delay = () =>{
                        client.destroy();
                        io.emit('status','ready')
                    }
                    setTimeout(delay, 2000)
                    }
                    }
                    setTimeout(checkAuth, 3000)
                });
            
                
    });
 

// Start server
db.sequelize.sync().then(() => {
    server.listen(port, () =>{
                console.log("Server running on port " + port);
    })

})





