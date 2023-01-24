"use strict"
/**
 * @author Gaurang Ghadiya
 * @description Server and REST API config
 */

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongooseConnection = require('./database');
const packageInfo = require('../package.json');
const router = require('./Routes');
const fileUpload = require('express-fileupload');

 
const app = express();
var allow_list = ['https://www.unicornui.com']

app.use(fileUpload({
    useTempFiles: true,
}))
app.use(cors())
// app.use(mongooseConnection)

app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
const health = (req, res) => {
    return res.status(200).json({
        message: `Borobazar Server is Running, Server health is green`,
        app: packageInfo.name,
        version: packageInfo.version,
        description: packageInfo.description,   
        author: packageInfo.author,
        license: packageInfo.license
    })
}
const bad_gateway = (req, res) => { return res.status(502).json({ status: 502, message: "grubgrams Backend API Bad Gateway" }) }

app.get('/', health);
app.get('/health', health);
app.get('/isServerUp', (req, res) => {
    res.send('Server is running ');
});
app.use('/', router)
app.use('*', bad_gateway);


let server = new http.Server(app);
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`server started on port ${port}`);
});
// export default server;
