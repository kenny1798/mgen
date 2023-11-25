const express = require('express');
const app = express();
const cors = require('cors');
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
const { validateToken, validateAdmin } = require('./middlewares/AuthMiddleware');
const { Client, LocalAuth } = require('whatsapp-web.js');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('form_images'))

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"],
    }
});
 
// Start server
db.sequelize.sync().then(() => {
    server.listen(port, () =>{
                console.log("Server running on port " + port);
    })

})





