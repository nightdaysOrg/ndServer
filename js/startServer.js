let express = require('express');
let config = require('../config/server');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();


let server = express();

server.use(bodyParser.json());

//前端资源
server.use('/', express.static(config.staticResourcePath));

//跨域处理
function cors(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
}

//后端资源 加载
if (config.controllersPath) {
    let ctrlConfig = require(config.controllersPath);
    let controllersRoot = ctrlConfig.root;
    let controllers = ctrlConfig.controllers;
    let rootPath = "/";
    if (controllersRoot) {
        rootPath += controllersRoot + "/";
    }
    if (controllers) {
        for (let ctrl in controllers) {
            if (ctrl.indexOf("upload") > -1) {
                server.use(rootPath + ctrl, upload.any(), function (req, res) {
                    // cors(res);
                    controllers[ctrl](req, res);
                });
            } else {
                server.use(rootPath + ctrl, function (req, res) {
                    // cors(res);
                    controllers[ctrl](req, res);
                });
            }


        }
    }
}



//http
server.listen(config.port, '127.0.0.1', function () {
    console.log("服务启动中");
});

//https---------
//获取密钥
let key = fs.readFileSync("../cert/private.key");
//获取证书
let cert = fs.readFileSync("../cert/cert.crt");

https.createServer({ key: key, cert: cert }, server).listen(443);



//关闭进程
let stopServer = express();
stopServer.listen(13001, 'localhost', function () {
});
stopServer.use('/', function (req, res) {
    res.send('关闭服务器');
    console.log('服务器关闭');
    setTimeout(() => process.exit(), 0);
})